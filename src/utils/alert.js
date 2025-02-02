import Swal from "sweetalert2";

const ToastAlert = Swal.mixin({
  toast: true,
  position: "top-right",

  customClass: {
    popup: "colored-toast !bg-white dark:!bg-coal-500",
  },
  showConfirmButton: false,
  timer: 3000,
  heightAuto: false,
  timerProgressBar: true,
});

const successAlert = (text) => {
  ToastAlert.fire({
    title: "Success",
    text: text,
    icon: "success",
    iconColor: "#6dd48f",
    customClass: {
      timerProgressBar: "bg-success",
      title: "text-gray-800 !py-0 !my-0",
      popup: "colored-toast !bg-white dark:!bg-coal-500",
      htmlContainer: "!text-gray-800 !py-0 !my-0",
    },
  });
};

const errorAlert = (text) => {
  ToastAlert.fire({
    title: "Error",
    text: text,
    icon: "error",
    iconColor: "#ff8d80",
    customClass: {
      timerProgressBar: "bg-danger",
      title: "text-gray-800 !py-0 !my-0",
      popup: "colored-toast !bg-white dark:!bg-coal-500",
      htmlContainer: "!text-gray-800 !py-0 !my-0",
    },
  });
};

export { errorAlert, successAlert };
