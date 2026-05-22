const ErrorMessage = (
    {error,
    onRetry}

) => {
  return (
    <div>
        <h3>Error occurred</h3>
        <p>{error?.message || error}</p>
        <button onClick={onRetry}>Try again</button>
    </div>
  )
}

export default ErrorMessage