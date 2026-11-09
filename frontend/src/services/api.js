const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const getToken = () => localStorage.getItem('skillor_token');
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('skillor_token', token);
  } else {
    localStorage.removeItem('skillor_token');
  }
};


async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : {
      "Content-Type": "application/json",
    }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Browser must set multipart boundary automatically
  if (isFormData) {
    Object.keys(headers).forEach((key) => {
      if (key.toLowerCase() === "content-type") {
        delete headers[key];
      }
    });
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg =
        data.message ||
        `Request failed with status ${response.status}`;

      return {
        success: false,
        status: response.status,
        message: errorMsg,
        data: null,
      };
    }

    return {
      success: true,
      ...data,
    };

  } catch (err) {
    console.warn(
      `[API Network Error on ${endpoint}]:`,
      err.message
    );

    return {
      success: false,
      message:
        err.message ||
        "Network connection error. Is the backend server running on port 5001?",
      isNetworkError: true,
    };
  }
}


export const api = {
  auth: {
    login: (credentials) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    me: () => apiRequest('/auth/me'),
    quickDemo: (role = 'learner') =>
      apiRequest('/auth/quick-demo', {
        method: 'POST',
        body: JSON.stringify({ role }),
      }),
    forgotPassword: (email) =>
      apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  },

  stats: {
    getSummary: () => apiRequest('/stats/summary'),
  },

  matches: {
    getMatches: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/matches${query ? `?${query}` : ''}`);
    },
    getMatchWithUser: (userId) => apiRequest(`/matches/${userId}`),
  },

  requests: {
    getRequests: (status) =>
      apiRequest(`/exchange-requests${status ? `?status=${status}` : ''}`),
    createRequest: (proposal) =>
      apiRequest('/exchange-requests', {
        method: 'POST',
        body: JSON.stringify(proposal),
      }),
    acceptRequest: (id) =>
      apiRequest(`/exchange-requests/${id}/accept`, {
        method: 'PUT',
      }),
    rejectRequest: (id) =>
      apiRequest(`/exchange-requests/${id}/reject`, {
        method: 'PUT',
      }),
    completeRequest: (id) =>
      apiRequest(`/exchange-requests/${id}/complete`, {
        method: 'PUT',
      }),
  },

  skills: {
    getAll: () => apiRequest('/skills'),
    getById: (id) => apiRequest(`/skills/${id}`),
    getMySkills: () => apiRequest('/skills/my-skills'),
    addSkill: (skill) =>
      apiRequest('/skills/my-skills', {
        method: 'POST',
        body: JSON.stringify(skill),
      }),
    deleteSkill: (id) =>
      apiRequest(`/skills/my-skills/${id}`, {
        method: 'DELETE',
      }),
  },

  sessions: {
    getSessions: (status) =>
      apiRequest(`/sessions${status ? `?status=${status}` : ''}`),
    createSession: (sessionData) =>
      apiRequest('/sessions', {
        method: 'POST',
        body: JSON.stringify(sessionData),
      }),
    updateSession: (id, updates) =>
      apiRequest(`/sessions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      }),
    deleteSession: (id) =>
      apiRequest(`/sessions/${id}`, {
        method: 'DELETE',
      }),
  },

  chat: {
    getConversations: () =>
      apiRequest('/chat/conversations'),

    getMessages: (conversationId) =>
      apiRequest(`/chat/conversations/${conversationId}/messages`),

    sendMessage: (conversationId, message) => {
      const isFormData =
        typeof FormData !== "undefined" &&
        message instanceof FormData;

      return apiRequest(
        `/chat/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          body: isFormData
            ? message
            : JSON.stringify({ text: message }),
        }
      );
    },

    startConversation: (peerId, initialMessage) =>
      apiRequest('/chat/conversations/start', {
        method: 'POST',
        body: JSON.stringify({ peerId, initialMessage }),
      }),
  },

  users: {
    getUsers: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/users${query ? `?${query}` : ''}`);
    },
    getUserById: (id) => apiRequest(`/users/${id}`),
    updateProfile: (profile) =>
      apiRequest('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      }),
    getPortfolio: () => apiRequest('/users/portfolio'),
  },

  reviews: {
    createReview: (reviewData) =>
      apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }),
    getUserReviews: (userId) => apiRequest(`/reviews/user/${userId}`),
  },
};

export default api;