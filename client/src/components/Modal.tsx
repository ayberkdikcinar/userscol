interface ModalProps {
  handleCancelClick: () => void;
  isOpen: boolean;
  header: string;
  children: JSX.Element;
}

export default function CustomModal({ isOpen, header, handleCancelClick, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden='true'></div>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
            <div className='flex justify-between items-center p-2 bg-gray-100'>
              <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
                {header}
              </h3>
              <button
                onClick={handleCancelClick}
                type='button'
                className='justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200'
              >
                X
              </button>
            </div>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='text-center sm:mt-0 sm:text-left'>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
