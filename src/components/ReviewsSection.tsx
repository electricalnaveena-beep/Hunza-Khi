import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, UserCheck } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Karachi');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productTitle, setProductTitle] = useState('Organic Sun-Dried Hunza Apricots');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    onAddReview({
      author: author.trim(),
      city: city.trim(),
      rating,
      comment: comment.trim(),
      productTitle,
    });
    setAuthor('');
    setComment('');
    setShowForm(false);
  };

  return (
    <section className="bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] rounded-[24px] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#1A1A1A] pb-4">
        <div>
          <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-1">
            VERIFIED CUSTOMER TESTIMONIALS
          </span>
          <h3 className="text-2xl font-black text-[#1A1A1A] font-serif">
            Loved Across Pakistan
          </h3>
          <p className="text-xs text-neutral-600 font-bold">
            Real feedback from kitchens in Karachi, Lahore, Islamabad & Northern Areas
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#FFD700] hover:bg-[#ffe033] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review Submission Form Toggle */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl space-y-3 animate-in fade-in duration-150">
          <h4 className="text-xs font-black uppercase text-[#1A1A1A]">Leave Your Product Feedback</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name *"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
            />
            <input
              type="text"
              required
              placeholder="City (e.g. Lahore) *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="bg-white border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
            >
              <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
              <option value={3}>⭐⭐⭐ 3 Stars</option>
            </select>
          </div>

          <textarea
            required
            rows={2}
            placeholder="Tell us about the taste, quality, and COD delivery experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white border-2 border-[#1A1A1A] p-3 rounded-xl text-xs font-semibold"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border-2 border-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-neutral-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1A1A] text-white text-xs font-black rounded-xl border border-black cursor-pointer hover:bg-black"
            >
              Post Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-xs text-[#1A1A1A]">
                    <span>{rev.author}</span>
                    <span className="text-[10px] text-neutral-500 font-bold">({rev.city})</span>
                    {rev.verified && (
                      <span className="px-1.5 py-0.2 bg-green-100 text-green-800 text-[9px] font-black rounded border border-green-300 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-green-700" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 block mt-0.5">
                    Item: {rev.productTitle}
                  </span>
                </div>

                <div className="flex text-[#FFD700]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFD700] text-black" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-700 font-medium leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="text-[10px] text-neutral-400 font-bold text-right pt-2 mt-2 border-t border-neutral-200">
              {rev.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
