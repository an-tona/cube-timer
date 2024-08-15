export default function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);

    if (minutes > 0) {
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`;
    } else {
        return `${seconds}.${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`;
    }
};