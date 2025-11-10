import loader from '../assets/spinner.svg';

export default function Loader() {
  return (
    <div className='fixed flex justify-center items-center inset-0'>
        <img src={loader} alt="loader" className="loader" />
    </div>
  )
}
