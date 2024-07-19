export default function SpeedSlider({ speed, setSpeed }) {
  const handleSliderChange = (event) => {
    setSpeed(parseFloat(event.target.value));
  };

  return (
    <div className="my-[20px] flex items-center justify-center gap-2 mr-1">
      <label className="w-1/3 ">Speed: {speed.toFixed(1)}x</label>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={speed}
        onChange={handleSliderChange}
        className="w-2/3 appearance-none"
        style={{
          accentColor: '#FE8C00',
          background: `linear-gradient(to right, #FE8C00 ${((speed - 1) / 9) * 100}%, #d1d5db ${((speed - 1) / 9) * 100}%)`,
        }}
      />
      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: #d1d5db;
          outline: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FE8C00;
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FE8C00;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
