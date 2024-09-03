type WrapperProps = {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  return <div className="flex justify-between border-b">{children}</div>
}
