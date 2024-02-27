export default function ShowWhen({ when = false, children }) {
  return when ? children : null;
}
