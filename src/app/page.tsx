import DragAndDrop from './components/DragAndDrop'
import styles from './page.module.css'

export default function Home() {

  return (
    <main className={styles.main}>
      <div>
        <h1>PDF to PNG Batch converter</h1>
        <DragAndDrop />
      </div>
    </main>
  )
}
