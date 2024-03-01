import styles from './PaymentSuccess.module.css'

export default function PaymentSuccess() {
    return (
      <div className={styles.succes_container}>
    
        <main className="grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className={`mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl ${styles.text}`}>Pedido Exitoso</h1>
            <p className={ `mt-6 text-base leading-7 text-gray-600 ${styles.text}`}>Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/catalogo"
                className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_home}`}
              >
                Volver a comprar
              </a>
              <a href="#" className="text-sm font-semibold text-white">
                Contactar con soporte <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }
  