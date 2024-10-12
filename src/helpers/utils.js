export const formatCurrency = (value) => {
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
  
export const parseCurrency = (value) => {
    return value.replace(/\$\s?|(,*)/g, '');
};