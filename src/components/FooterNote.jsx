export default function FooterNote({ onBack }) {
    return (
      <div className="fixed bottom-4  left-4 right-4 flex items-center justify-between text-gray-500 text-sm">
        <span>🤔 We understand finding the right product is tough.<br/> Let us help you find the right one <a href="/contact" className="underline text-blue-600">Contact Us</a></span>
        {onBack && (
          <button onClick={onBack} className="px-3 py-2 bg-blue-600 text-white rounded-full">
            ←
          </button>
        )}
      </div>
    );
  }
  