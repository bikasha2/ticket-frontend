import { toast } from 'react-toastify';

const deleteTicketToast = () => {
    toast.success('Ticket has been deleted successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};
const ErrordeleteTicketToast = () => {
    toast.error('Cannot delet Ticket !', {
        position: toast.POSITION.TOP_RIGHT
    });
};


const completeTicketToast = () => {
    toast.success('Ticket has been marked completed !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const ErrorcompleteTicketToast = () => {
    toast.success('Error in marking ticket complete !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const uncompleteTicketToast = () => {
    toast.success('Ticket has been marked uncompleted !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const ErroruncompleteTicketToast = () => {
    toast.success('Error in marking ticket uncomplete !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const assigneTicketToast = () => {
    toast.success('Assignee has been changed successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const ErrorassigneTicketToast = () => {
    toast.success('Error in changing assignee !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

export {
    deleteTicketToast,
    ErrordeleteTicketToast,
    completeTicketToast,
    ErrorcompleteTicketToast,
    uncompleteTicketToast, 
    ErroruncompleteTicketToast,
    assigneTicketToast,
    ErrorassigneTicketToast
}