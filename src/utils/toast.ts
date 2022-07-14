import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastConfig: ToastOptions = {
	position: 'bottom-right',
	autoClose: 3000,
};

const showErrorToast = (message: string) => {
	toast.error(message, {
		...defaultToastConfig,
	});
};

export { showErrorToast };
