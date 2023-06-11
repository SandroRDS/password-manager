import './LoadingScreen.scss';

function LoadingScreen({ loadingFinish }: { loadingFinish: boolean }) {
  return (
    <main className={`loading-screen ${loadingFinish ? 'loading-screen--finish' : ''}`}>
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </main>
  );
}

export default LoadingScreen;
