// Hook para configuraciones de API
export const useApiConfig = () => {
    const API_BASE_URL = 'http://localhost:8000/api';
    
    return {
        endpoints: {
            excel: {
                upload: `${API_BASE_URL}/excel/upload`,
                files: `${API_BASE_URL}/excel/files`,
                download: (filename) => `${API_BASE_URL}/excel/download/${filename}`,
                dashboardData: `${API_BASE_URL}/excel/dashboard-data`
            },
            machines: {
                list: `${API_BASE_URL}/machines`,
                details: (id) => `${API_BASE_URL}/machines/details/${id}`,
                descendants: (id) => `${API_BASE_URL}/machines/${id}/descendants`
            }
        },
        baseUrl: API_BASE_URL
    };
};

export default useApiConfig;
