export default function AnimateText({
  text,
  textColor,
}: {
  text: string
  textColor: string
}) {
  const characters = text.split("")

  return (
    <>
      <style>{`
        @keyframes wave{
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-5px); opacity: 0.5; }
        }
        .text_wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>

      <span style={{ color: textColor }} className="text-xl">
        {characters.map((char, index) => (
          <span
            key={index}
            className="text_wave"
            style={{ animationDelay: `calc(${index} * 0.1s)` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </>
  )
}
