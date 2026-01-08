export function LoginAnimations() {
  return (
    <style>{`
      @keyframes inputFocus {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
      @keyframes buttonPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
        50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
      }
      @keyframes logoFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(5deg); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      @keyframes floatOrb {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(30px, -20px) scale(1.1); }
        50% { transform: translate(-20px, 30px) scale(0.9); }
        75% { transform: translate(20px, 20px) scale(1.05); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateZ(0deg); }
        25% { transform: translateY(-15px) rotateZ(2deg); }
        50% { transform: translateY(-25px) rotateZ(0deg); }
        75% { transform: translateY(-15px) rotateZ(-2deg); }
      }
      @keyframes pulseGlow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.5); }
      }
      @keyframes drift {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(10px, -10px); }
        50% { transform: translate(-5px, 15px); }
        75% { transform: translate(-15px, -5px); }
      }
      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
      }
      @keyframes spin3d {
        0% { transform: perspective(500px) rotateY(0deg) rotateX(10deg); }
        100% { transform: perspective(500px) rotateY(360deg) rotateX(10deg); }
      }
      @keyframes wave {
        0%, 100% { transform: translateX(0) scaleY(1); }
        50% { transform: translateX(10px) scaleY(1.1); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
        50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4); }
      }
      @keyframes slideUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes scanLine {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
      .input-focus-effect:focus-within {
        animation: inputFocus 0.3s ease-out;
      }
      .btn-pulse:hover {
        animation: buttonPulse 1.5s infinite;
      }
      .logo-float:hover {
        animation: logoFloat 0.6s ease-in-out;
      }
    `}</style>
  );
}
