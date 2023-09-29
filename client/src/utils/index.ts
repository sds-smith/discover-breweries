
// city-grid
export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function capitalizeAll(string: string) {
    return string.split(' ').map(word => capitalize(word)).join(' ')
};

export function encodePath(string: string) {
  return string.split(' ').map(word => word.toLowerCase()).join('-')
};
  
//breadcrumbs
export function transformLabel(string: string) {
    return string.split('-').map((word) => capitalize(word)).join(' ');;
};

// brewery-card
export function encodeMapParams (street: string, city: string, state: string, postal_code: string) {
    return street.replace(' ', '+').concat('+',city,'+',state,'+',postal_code);
};

// search-bar
export function transformStateName(stateName: string) {
    return stateName.toLowerCase().replace(' ', '_');
};