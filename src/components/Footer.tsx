const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My Next.js Project</p>
      <style jsx>{`
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
