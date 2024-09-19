import {formStatus} from '../_reducers/forms';

export const FORM_SHOW = 'forms/show';
export const FORM_HIDE = 'forms/hide';
export const FORM_SUBMIT = 'forms/submit';
export const FORM_CLEAR_ERROR = 'forms/clearError';
export const FORM_SUBMIT_SUCCESS = 'forms/success';
export const FORM_SUBMIT_FAILURE = 'forms/error';

export const showForm = (formName, project, resourceId, redirect) => ({
  type: FORM_SHOW,
  formName,
  project,
  resourceId,
  redirect,
});

export const hideForm = formName => ({type: FORM_HIDE, formName});

export const submitForm = formName => ({type: FORM_SUBMIT, formName});

export const clearFormError = formName => (dispatch, getState) => {
  const {forms} = getState();
  const formState = formStatus(forms, formName);
  if (formState.error) {
    dispatch({type: FORM_CLEAR_ERROR, formName});
  }
};

export const handleFormError = (formName, error) => ({
  type: FORM_SUBMIT_FAILURE,
  formName,
  error,
});

export const handleFormSuccess = formName => ({
  type: FORM_SUBMIT_SUCCESS,
  formName,
});
