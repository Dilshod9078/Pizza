
import loadingImage from '../assets/Images/loading.gif';

function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <img src={loadingImage} alt="Loading..." />
    </div>
  );
}

export default LoadingComponent;