import { env } from "node:process";

declare global {
    interface Window {
      PaystackPop: any;
    }
  }
  
  type PayProps = {
    email: string;
    amount: number; // in GHS (not pesewas yet)
  };
  
  export default function PayNow({ email, amount }: PayProps) {
  
    const startPayment = () => {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
        email: email,
        amount: amount , // convert to pesewas
        currency: "GHS",
        ref: "ADI" + Date.now(),

        subaccount: process.env.NEXT_PUBLIC_WABI_SABI!,
  
        callback: (response: any) => {
          console.log("Payment successful:", response.reference);
          alert("Payment successful 🎉");
        },
  
        onClose: () => {
          alert("Payment cancelled");
        }
      });
  
      handler.openIframe();
    };
  
    return (
      <button
        onClick={startPayment}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Pay Now
      </button>
    );
  }
  