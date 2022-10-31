interface SendTimeProps {
  time: Date;
}
export default function Time({ time }: SendTimeProps) {
  return (
    <>
      {time && (
        <span className="text-xs text-slate-400">
          {parseInt(time.getFullYear().toString().slice(-2))}.{time.getMonth() + 1}.{time.getDate()}. {""}
          {time.getHours() <= 12
            ? time.getHours() === 12
              ? `오후 ${time.getHours()}`
              : `오전 ${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}`
            : time.getHours() === 24
            ? `오전 ${time.getHours() - 24 < 10 ? `0${time.getHours() - 24}` : time.getHours() - 24}`
            : `오후 ${time.getHours() - 12 < 10 ? `${time.getHours() - 12}` : time.getHours() - 12}`}
          :{time.getMinutes()}
        </span>
      )}
    </>
  );
}
