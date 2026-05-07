import { LaunchState } from "@/components/launch-state";

export default function NotFound() {
  return (
    <LaunchState
      eyebrow="Signal Not Found"
      title="This path is quiet."
      message="The seal or route you opened is unavailable. Return to the ritual to begin again."
      actionLabel="Return Home"
    />
  );
}
