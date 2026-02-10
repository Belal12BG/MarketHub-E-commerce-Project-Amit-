// Format price to currency (EGP or USD)
export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

// Capitalize first letter of each word
export const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Get error message from API response or fallback
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice)
    return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

// Debounce function for search inputs
export const debounce = (func, delay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Check if object is empty
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
