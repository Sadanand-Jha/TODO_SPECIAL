import './loadENV.ts'
import app from './app.ts'
import connectDB from './db/index.ts'


connectDB()

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});