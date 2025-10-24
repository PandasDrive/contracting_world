// API Integration Service for Live Contract Tracker
// This service handles real-time data from multiple government and commercial APIs

class ContractAPIService {
    constructor() {
        this.apiKeys = {
            sam: process.env.SAM_API_KEY || 'DEMO_KEY',
            fpds: process.env.FPDS_API_KEY || 'DEMO_KEY',
            clearancejobs: process.env.CLEARANCEJOBS_API_KEY || 'DEMO_KEY'
        };
        
        this.endpoints = {
            sam: 'https://api.sam.gov/prod/opportunities/v2/search',
            fpds: 'https://api.fpds.gov/v1/awards',
            clearancejobs: 'https://api.clearancejobs.com/v1/jobs'
        };
        
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // SAM.gov API Integration
    async fetchSAMContracts(filters = {}) {
        try {
            const params = new URLSearchParams({
                api_key: this.apiKeys.sam,
                limit: '100',
                postedFrom: filters.postedFrom || '2024-01-01',
                postedTo: filters.postedTo || new Date().toISOString().split('T')[0],
                ...filters
            });

            const response = await fetch(`${this.endpoints.sam}?${params}`);
            
            if (!response.ok) {
                throw new Error(`SAM API Error: ${response.status}`);
            }

            const data = await response.json();
            return this.processSAMData(data);
        } catch (error) {
            console.error('SAM API Error:', error);
            return this.getFallbackSAMData();
        }
    }

    // FPDS API Integration
    async fetchFPDSAwards(filters = {}) {
        try {
            const params = new URLSearchParams({
                api_key: this.apiKeys.fpds,
                limit: '100',
                awardDateFrom: filters.awardDateFrom || '2024-01-01',
                awardDateTo: filters.awardDateTo || new Date().toISOString().split('T')[0],
                ...filters
            });

            const response = await fetch(`${this.endpoints.fpds}?${params}`);
            
            if (!response.ok) {
                throw new Error(`FPDS API Error: ${response.status}`);
            }

            const data = await response.json();
            return this.processFPDSData(data);
        } catch (error) {
            console.error('FPDS API Error:', error);
            return this.getFallbackFPDSData();
        }
    }

    // ClearanceJobs API Integration
    async fetchClearanceJobsData(filters = {}) {
        try {
            const params = new URLSearchParams({
                api_key: this.apiKeys.clearancejobs,
                limit: '50',
                clearance: filters.clearance || 'all',
                location: filters.location || 'all',
                ...filters
            });

            const response = await fetch(`${this.endpoints.clearancejobs}?${params}`);
            
            if (!response.ok) {
                throw new Error(`ClearanceJobs API Error: ${response.status}`);
            }

            const data = await response.json();
            return this.processClearanceJobsData(data);
        } catch (error) {
            console.error('ClearanceJobs API Error:', error);
            return this.getFallbackClearanceJobsData();
        }
    }

    // Process SAM.gov data into standardized format
    processSAMData(data) {
        return data.opportunities?.map(opp => ({
            id: opp.noticeId,
            title: opp.title,
            agency: opp.organizationType,
            value: this.extractContractValue(opp),
            status: this.determineContractStatus(opp),
            daysRemaining: this.calculateDaysRemaining(opp.responseDeadLine),
            progress: this.calculateProgress(opp),
            impact: this.calculateImpact(opp),
            prime: opp.organizationName,
            description: opp.description,
            employees: this.estimateEmployees(opp),
            locations: this.extractLocations(opp),
            specialties: this.extractSpecialties(opp),
            lastUpdated: new Date().toISOString(),
            dataSource: 'SAM.gov',
            rawData: opp
        })) || [];
    }

    // Process FPDS data into standardized format
    processFPDSData(data) {
        return data.awards?.map(award => ({
            id: award.piid,
            title: award.title,
            agency: award.awardingAgencyName,
            value: `$${(award.totalObligatedAmount / 1000000).toFixed(1)}M`,
            status: this.determineAwardStatus(award),
            daysRemaining: this.calculateAwardDaysRemaining(award),
            progress: this.calculateAwardProgress(award),
            impact: this.calculateAwardImpact(award),
            prime: award.recipientName,
            description: award.description,
            employees: this.estimateAwardEmployees(award),
            locations: this.extractAwardLocations(award),
            specialties: this.extractAwardSpecialties(award),
            lastUpdated: new Date().toISOString(),
            dataSource: 'FPDS',
            rawData: award
        })) || [];
    }

    // Process ClearanceJobs data into standardized format
    processClearanceJobsData(data) {
        return data.jobs?.map(job => ({
            id: `CJ-${job.id}`,
            title: job.title,
            agency: job.company,
            value: this.estimateJobValue(job),
            status: 'active',
            daysRemaining: this.calculateJobDaysRemaining(job),
            progress: 50,
            impact: this.calculateJobImpact(job),
            prime: job.company,
            description: job.description,
            employees: '1-10',
            locations: [job.location],
            specialties: job.skills || [],
            lastUpdated: new Date().toISOString(),
            dataSource: 'ClearanceJobs',
            rawData: job
        })) || [];
    }

    // Utility methods for data processing
    extractContractValue(opp) {
        const value = opp.estimatedValue || opp.maxValue;
        if (value) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        return 'TBD';
    }

    determineContractStatus(opp) {
        const now = new Date();
        const deadline = new Date(opp.responseDeadLine);
        
        if (deadline < now) {
            return 'expired';
        } else if (opp.awardDate) {
            return 'awarded';
        } else {
            return 'active';
        }
    }

    calculateDaysRemaining(deadline) {
        if (!deadline) return 0;
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    calculateProgress(opp) {
        const now = new Date();
        const posted = new Date(opp.postedDate);
        const deadline = new Date(opp.responseDeadLine);
        
        const totalTime = deadline - posted;
        const elapsed = now - posted;
        
        return Math.min(Math.max((elapsed / totalTime) * 100, 0), 100);
    }

    calculateImpact(opp) {
        const value = opp.estimatedValue || opp.maxValue || 0;
        if (value > 1000000000) return 'high';
        if (value > 100000000) return 'medium';
        return 'low';
    }

    estimateEmployees(opp) {
        const value = opp.estimatedValue || opp.maxValue || 0;
        if (value > 1000000000) return '1000+';
        if (value > 100000000) return '100-1000';
        return '10-100';
    }

    extractLocations(opp) {
        // Extract locations from opportunity data
        const locations = [];
        if (opp.placeOfPerformance) {
            locations.push(opp.placeOfPerformance);
        }
        if (opp.organizationLocation) {
            locations.push(opp.organizationLocation);
        }
        return locations.length > 0 ? locations : ['TBD'];
    }

    extractSpecialties(opp) {
        // Extract specialties from NAICS codes and description
        const specialties = [];
        if (opp.naicsCode) {
            specialties.push(this.mapNAICSToSpecialty(opp.naicsCode));
        }
        if (opp.description) {
            const descSpecialties = this.extractSpecialtiesFromDescription(opp.description);
            specialties.push(...descSpecialties);
        }
        return [...new Set(specialties)].slice(0, 5);
    }

    mapNAICSToSpecialty(naicsCode) {
        const naicsMap = {
            '541511': 'Custom Computer Programming',
            '541512': 'Computer Systems Design',
            '541513': 'Computer Facilities Management',
            '541519': 'Other Computer Related Services',
            '541690': 'Other Scientific and Technical Consulting',
            '541712': 'Research and Development in Physical Sciences',
            '541720': 'Research and Development in Social Sciences'
        };
        return naicsMap[naicsCode] || 'IT Services';
    }

    extractSpecialtiesFromDescription(description) {
        const specialties = [];
        const keywords = {
            'cybersecurity': 'Cybersecurity',
            'cloud': 'Cloud Computing',
            'ai': 'Artificial Intelligence',
            'machine learning': 'Machine Learning',
            'data science': 'Data Science',
            'software': 'Software Development',
            'network': 'Network Engineering',
            'database': 'Database Management'
        };

        const lowerDesc = description.toLowerCase();
        Object.keys(keywords).forEach(keyword => {
            if (lowerDesc.includes(keyword)) {
                specialties.push(keywords[keyword]);
            }
        });

        return specialties;
    }

    // Fallback data methods for when APIs are unavailable
    getFallbackSAMData() {
        return [
            {
                id: 'SAM-FALLBACK-001',
                title: 'NSA Cybersecurity Operations',
                agency: 'NSA',
                value: '$2.1B',
                status: 'recompete',
                daysRemaining: 45,
                progress: 85,
                impact: 'high',
                prime: 'Lockheed Martin',
                description: 'Critical cybersecurity operations and threat analysis',
                employees: '2,500+',
                locations: ['Fort Meade, MD', 'San Antonio, TX'],
                specialties: ['Cybersecurity', 'Threat Analysis', 'Incident Response'],
                lastUpdated: new Date().toISOString(),
                dataSource: 'SAM.gov (Fallback)'
            }
        ];
    }

    getFallbackFPDSData() {
        return [
            {
                id: 'FPDS-FALLBACK-001',
                title: 'NGA Geospatial Intelligence',
                agency: 'NGA',
                value: '$1.8B',
                status: 'active',
                daysRemaining: 420,
                progress: 25,
                impact: 'high',
                prime: 'Northrop Grumman',
                description: 'Satellite imagery analysis and geospatial intelligence',
                employees: '1,800+',
                locations: ['Springfield, VA', 'St. Louis, MO'],
                specialties: ['GEOINT', 'Satellite Analysis', 'GIS'],
                lastUpdated: new Date().toISOString(),
                dataSource: 'FPDS (Fallback)'
            }
        ];
    }

    getFallbackClearanceJobsData() {
        return [
            {
                id: 'CJ-FALLBACK-001',
                title: 'Senior Cybersecurity Engineer',
                agency: 'Booz Allen Hamilton',
                value: '$120k-$180k',
                status: 'active',
                daysRemaining: 30,
                progress: 50,
                impact: 'medium',
                prime: 'Booz Allen Hamilton',
                description: 'Senior cybersecurity engineer with TS/SCI clearance',
                employees: '1-10',
                locations: ['McLean, VA'],
                specialties: ['Cybersecurity', 'TS/SCI', 'Engineering'],
                lastUpdated: new Date().toISOString(),
                dataSource: 'ClearanceJobs (Fallback)'
            }
        ];
    }

    // Cache management
    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Main method to fetch all live data
    async fetchAllLiveData() {
        const cacheKey = 'all-live-data';
        const cached = this.getCachedData(cacheKey);
        
        if (cached) {
            return cached;
        }

        try {
            const [samData, fpdsData, clearanceJobsData] = await Promise.allSettled([
                this.fetchSAMContracts(),
                this.fetchFPDSAwards(),
                this.fetchClearanceJobsData()
            ]);

            const result = {
                sam: samData.status === 'fulfilled' ? samData.value : [],
                fpds: fpdsData.status === 'fulfilled' ? fpdsData.value : [],
                clearancejobs: clearanceJobsData.status === 'fulfilled' ? clearanceJobsData.value : [],
                timestamp: new Date().toISOString(),
                sources: {
                    sam: samData.status === 'fulfilled',
                    fpds: fpdsData.status === 'fulfilled',
                    clearancejobs: clearanceJobsData.status === 'fulfilled'
                }
            };

            this.setCachedData(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Error fetching live data:', error);
            return this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            sam: this.getFallbackSAMData(),
            fpds: this.getFallbackFPDSData(),
            clearancejobs: this.getFallbackClearanceJobsData(),
            timestamp: new Date().toISOString(),
            sources: {
                sam: false,
                fpds: false,
                clearancejobs: false
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContractAPIService;
}
