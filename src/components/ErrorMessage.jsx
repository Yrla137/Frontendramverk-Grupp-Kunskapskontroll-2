const ErrorMessage = (
    {error,
    onRetry}

) => {
  return (
    <div>
      <div role="alert" aria-live="assertive">
        <h3>Error occurred</h3>
        <p>{error?.message || error}</p>
        <button onClick={onRetry}>Try again</button>
        <button type="button" onClick={onRetry}>Try again</button>
      </div>
    </div>
    )
  }

export default ErrorMessage