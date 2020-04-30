export const canApply = (job, userId) => {
  const application = job.applications && job.applications.filter(application => application.user._id === userId).length > 0
  return application
}