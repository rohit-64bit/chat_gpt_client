import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleNativeUpgrade = async () => {
    setIsLoading(true);
    try {
      // 1. Create order on our backend
      // Using a dummy token for now since frontend login isn't fully wired yet
      const dummyToken = localStorage.getItem('token') || 'dummy-token'; 
      
      const res = await fetch('http://localhost:3001/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dummyToken}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to create order');
      }
      
      const order = await res.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_test_TVkhOksU7vM6yd', 
        amount: order.amount, 
        currency: order.currency,
        name: 'ChatGPT Clone Pro',
        description: 'Upgrade to Plus Plan',
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await fetch('http://localhost:3001/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dummyToken}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (verifyRes.ok) {
              alert('Payment successful! You are now a Pro user.');
              onUpgradeSuccess();
              onClose();
            } else {
              alert('Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            alert('An error occurred during verification.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#10a37f'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert('Could not initiate payment. Please try again or use the fallback link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#212121] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#424242]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#ececec]">Upgrade your plan</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] rounded-md transition-colors text-gray-500 dark:text-[#b4b4b4]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col md:flex-row gap-6">
          
          {/* Free Tier */}
          <div className="flex-1 border border-gray-200 dark:border-[#424242] rounded-xl p-5 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-[#ececec] mb-2">Free</h3>
            <div className="text-gray-500 dark:text-[#b4b4b4] text-sm mb-6">₹0/month</div>
            <button className="w-full py-2 bg-gray-100 dark:bg-[#2f2f2f] text-gray-500 dark:text-[#b4b4b4] font-medium rounded-lg cursor-not-allowed mb-6">
              Your current plan
            </button>
            <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-[#ececec]">
              <div className="flex items-start gap-2">
                <Check size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <span>Access to our basic model</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <span>Standard response speed</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <span>Regular model updates</span>
              </div>
            </div>
          </div>

          {/* Plus Tier */}
          <div className="flex-1 border-2 border-[#10a37f] rounded-xl p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#10a37f] text-white text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">
              Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-[#ececec] mb-2">Plus</h3>
            <div className="text-gray-500 dark:text-[#b4b4b4] text-sm mb-6">₹500/month</div>
            
            <button 
              onClick={handleNativeUpgrade}
              disabled={isLoading}
              className="w-full py-2 bg-[#10a37f] hover:bg-[#0d8c6d] text-white font-medium rounded-lg transition-colors mb-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Upgrade to Plus'}
            </button>
            
            {/* Fallback Payment Link */}
            <a 
              href="https://rzp.io/rzp/p9rzvTK" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-2 text-center text-xs text-[#10a37f] hover:underline mb-4"
            >
              Having trouble? Use Alternative Payment Link
            </a>

            <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-[#ececec]">
              <div className="flex items-start gap-2">
                <Check size={18} className="text-[#10a37f] mt-0.5 shrink-0" />
                <span>Access to our smartest models</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={18} className="text-[#10a37f] mt-0.5 shrink-0" />
                <span>Faster response speed</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={18} className="text-[#10a37f] mt-0.5 shrink-0" />
                <span>Priority access to new features</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
