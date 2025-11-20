import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h2
          className="mt-6 text-2xl font-display font-bold gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading Portfolio...
        </motion.h2>
      </div>
    </div>
  );
};

export default Loader;
