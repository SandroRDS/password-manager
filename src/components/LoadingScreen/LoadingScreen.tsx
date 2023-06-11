import './LoadingScreen.scss';

function LoadingScreen() {
  return (
    <main className='loading-screen'>
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
