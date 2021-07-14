import {emailRegex} from './constants';
export const getLoginValidation = data => {
  const {user, first, last, email, password, confirm, profile} = data;
  const error = {};
  if (!user.trim()) {
    error.user = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!first.trim()) {
    error.first = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!last.trim()) {
    error.last = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!email.trim()) {
    error.email = '* Field is required';
    error.error = true;
  } else if (!emailRegex.test(email)) {
    error.email = '* Enter valid email';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!password.trim()) {
    error.password = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!confirm.trim()) {
    error.confirm = '* Field is required';
    error.error = true;
  } else if (password !== confirm) {
    error.confirm = '* Confirm password should match password';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  return error;
};

export const getRegistrationValidation = data => {
  const {name, category, price, contact, desc, address, profile} = data;
  const error = {};
  if (!name.trim()) {
    error.name = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!category.trim()) {
    error.category = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!price.trim()) {
    error.price = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!address.trim()) {
    error.address = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!desc.trim()) {
    error.desc = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!contact.trim()) {
    error.contact = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  return error;
};

export const getEditValidation = data => {
  const {user, first, last, email, password} = data;
  const error = {};
  if (!user.trim()) {
    error.user = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!first.trim()) {
    error.first = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!last.trim()) {
    error.last = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!email.trim()) {
    error.email = '* Field is required';
    error.error = true;
  } else if (!emailRegex.test(email)) {
    error.email = '* Enter valid email';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  if (!password.trim()) {
    error.password = '* Field is required';
    error.error = true;
  } else {
    error.error = error.error || false;
  }
  return error;
};