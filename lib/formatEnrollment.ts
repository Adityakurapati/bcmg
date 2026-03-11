export function formatEnrollment(enrollment: string) {
  if (!enrollment) return "";
  return enrollment.replace(/_/g, "/");
}
