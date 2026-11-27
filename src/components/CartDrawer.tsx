import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { formatRs } from '../data/shoes';
import { CartItem, OrderReceipt } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, size: number, delta: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onClearCart: () => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed';

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal === 0 || subtotal >= 7000 ? 0 : 250;
  const total = subtotal + shipping;
  const freeDeliveryRemaining = Math.max(0, 7000 - subtotal);

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setReceipt(null);
    }
    onClose();
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      setFormError('Please fill in all delivery details to confirm your order.');
      return;
    }

    setFormError('');
    const orderNumber = `SS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReceipt: OrderReceipt = {
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      shipping,
      total,
      placedAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setReceipt(newReceipt);
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/45 backdrop-blur-[1px]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <aside
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to bag"
                className="p-1.5 -ml-1.5 text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-lg font-bold text-zinc-900">
              {step === 'bag' && 'Shopping Bag'}
              {step === 'checkout' && 'Delivery Verification'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'bag' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-2.5 bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-700">
                {freeDeliveryRemaining === 0 ? (
                  <span className="font-medium text-emerald-700">
                    Free nationwide delivery unlocked
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <strong className="tabular-nums">
                      {formatRs(freeDeliveryRemaining)}
                    </strong>{' '}
                    more for free delivery
                  </span>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-zinc-300 mb-3" />
                  <p className="text-base font-semibold text-zinc-900">
                    Your bag is empty
                  </p>
                  <p className="text-sm text-zinc-500 mt-1 max-w-xs">
                    Browse our Rs 6,000, Rs 7,000, and Rs 8,000 sports shoes and
                    select your EU size to get started.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 pb-4 border-b border-zinc-100 last:border-b-0"
                  >
                    <div className="w-24 h-20 bg-[#ECEEEF] rounded-md overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5 tabular-nums">
                            {item.product.brand} · EU {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.name}`}
                          className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-zinc-200 rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.product.id, item.size, -1)
                            }
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.product.id, item.size, 1)
                            }
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-zinc-900 tabular-nums">
                          {formatRs(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-zinc-900">
                      {formatRs(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Delivery</span>
                    <span className="tabular-nums font-medium text-zinc-900">
                      {shipping === 0 ? 'Free' : formatRs(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>Total</span>
                    <span className="tabular-nums">{formatRs(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-11 bg-zinc-900 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && (
          <form
            onSubmit={handlePlaceOrder}
            className="flex-1 flex flex-col justify-between overflow-y-auto"
          >
            <div className="p-6 space-y-4">
              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between text-sm">
                <span className="text-zinc-600">
                  Order Total ({items.reduce((a, b) => a + b.quantity, 0)} items)
                </span>
                <span className="font-bold text-zinc-900 tabular-nums">
                  {formatRs(total)}
                </span>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
                >
                  {formError}
                </p>
              )}

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-semibold text-zinc-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-semibold text-zinc-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-900 tabular-nums"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs font-semibold text-zinc-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Street / Sector"
                    className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-xs font-semibold text-zinc-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lahore"
                      className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-postal"
                      className="block text-xs font-semibold text-zinc-700 mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      id="checkout-postal"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="54000"
                      className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-900 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`h-10 px-3 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`h-10 px-3 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      Card on Delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200 bg-zinc-50">
              <button
                type="submit"
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Confirm Order · {formatRs(total)}
              </button>
            </div>
          </form>
        )}

        {step === 'confirmed' && receipt && (
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-emerald-900">
                    Order #{receipt.orderNumber} Confirmed — Preparing Shipment
                  </p>
                  <p className="text-xs text-emerald-800 mt-1">
                    Placed on {receipt.placedAt} ·{' '}
                    {receipt.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : 'Card on Delivery'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm border-b border-zinc-200 pb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Shipping To
                </p>
                <p className="font-semibold text-zinc-900">
                  {receipt.customerName}
                </p>
                <p className="text-zinc-600">{receipt.phone}</p>
                <p className="text-zinc-600">
                  {receipt.address}, {receipt.city} {receipt.postalCode}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Items Ordered
                </p>
                {receipt.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-zinc-700">
                      {item.quantity} × {item.product.name} (EU {item.size})
                    </span>
                    <span className="font-semibold text-zinc-900 tabular-nums">
                      {formatRs(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-zinc-200 flex justify-between text-base font-bold text-zinc-900">
                  <span>Total Payable</span>
                  <span className="tabular-nums">{formatRs(receipt.total)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full h-11 mt-6 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
