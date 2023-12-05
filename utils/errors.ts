export const handleBackendError = err => {
  if (typeof err !== 'object')
    return 'An unknown error occurred'
  const errors = Object.values(err)
  let errorsToDisplay = '';

  errors.forEach(error => {
    console.log('typeof error', typeof error)
    if (typeof error === 'string') {
      errorsToDisplay = `${errorsToDisplay} ${error}`
    }
    if (Array.isArray(error)) {
      const allErrors = error.join(', ')
      console.log('allErrors', allErrors)
      errorsToDisplay = `${errorsToDisplay} ${allErrors}`
    }
  })

  console.log('errorsToDisplay', errorsToDisplay)
  return errorsToDisplay;
}