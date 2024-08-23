import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import useMutationCart from '../Hooks/useMutationCart';
import { cash, onlinePayment } from '../APIS/payment';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({cartId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [flag, setFlag] = React.useState(false)
  let {mutate, data} = useMutationCart('paymentonline',onlinePayment)
  let {mutate:mutateCash, data:dataCash} = useMutationCart('paymentcash',cash)

  function handleSubmit(shippingAddress) {
    if(flag) 
        mutate({cartId ,shippingAddress});
    else 
        mutateCash({cartId ,shippingAddress});
  }
  if(data?.data?.status == 'success') {
      window.location.href =data?.data?.session?.url;  

  }

  if(dataCash?.data?.status == 'success') {
    toast('all is Done')
  }

  console.log(dataCash)
  let formik = useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:''
    }, 
    onSubmit: handleSubmit
  })

  return (
    <div>
      <Button sx={{m:'30px'}}  variant='contained' color='success' onClick={()=>{handleOpen; setFlag(true)}}>Pay Online</Button>
      <Button sx={{m:'30px'}}  variant='contained' color='success' onClick={handleOpen}>Pay Cash</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            
            <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <input onChange={formik.handleChange} value={formik.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details"  />
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                    <input onChange={formik.handleChange} value={formik.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='city' />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='phone' />
                </div>
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>


          
        </Box>
      </Modal>
    </div>
  );
}