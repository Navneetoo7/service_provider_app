export const getFilteredData = (services, text) => {
  console.log(services, 'services');
  return services.filter(item => {
    return item.details.toLowerCase().includes(text.toLowerCase());
  });
};
