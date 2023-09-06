export default function Error({ text }) {
  if (text) {
    return (
      <p className="mt-1 text-sm text-red-600">{text}</p>
    );
  }
  return null;
}

