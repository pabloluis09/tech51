import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

const ChatAssistant = ({ productName }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `¡Hola! Soy el asistente virtual de Tech51. Estoy aquí para ayudarte con cualquier duda sobre ${productName}. ¿En qué puedo ayudarte?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Preguntas frecuentes sugeridas
  const suggestedQuestions = [
    `¿Cuáles son las características principales de ${productName}?`,
    `¿Tiene garantía el ${productName}?`,
    `¿Cuánto tarda el envío del ${productName}?`,
    `¿Puedo pagar en cuotas el ${productName}?`,
  ]

  useEffect(() => {
    scrollToBottom()
  }, []) // Updated dependency

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Añadir mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse = generateBotResponse(input, productName)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question) => {
    // Añadir la pregunta sugerida como mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse = generateBotResponse(question, productName)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-96">
      <div className="bg-blue-600 text-white p-3">
        <h3 className="font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          Asistente Tech51
        </h3>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border rounded-tl-none"
              }`}
            >
              <div className="flex items-start mb-1">
                {message.sender === "bot" && <Bot className="w-4 h-4 mr-1 mt-1" />}
                <div>{message.text}</div>
                {message.sender === "user" && <User className="w-4 h-4 ml-1 mt-1" />}
              </div>
              <div className={`text-xs ${message.sender === "user" ? "text-blue-200" : "text-gray-500"} text-right`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preguntas sugeridas */}
      {messages.length < 3 && (
        <div className="p-2 bg-gray-100 border-t">
          <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-white border rounded-full px-3 py-1 hover:bg-gray-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-3 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          className="input flex-grow"
          disabled={isTyping}
        />
        <button type="submit" className="btn btn-primary ml-2" disabled={isTyping || input.trim() === ""}>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

// Función para generar respuestas del bot basadas en palabras clave
const generateBotResponse = (userInput, productName) => {
  const input = userInput.toLowerCase()

  if (input.includes("características") || input.includes("especificaciones") || input.includes("funciones")) {
    return `${productName} cuenta con las últimas tecnologías del mercado, incluyendo un procesador de alto rendimiento, pantalla de alta resolución y una batería de larga duración. Para ver todas las especificaciones técnicas, puedes revisar la sección de detalles en esta misma página.`
  }

  if (input.includes("garantía")) {
    return `Todos nuestros productos, incluyendo ${productName}, cuentan con 12 meses de garantía oficial del fabricante. Además, como cliente de Tech51, tienes 30 días para devolución sin costo en caso de que el producto no cumpla tus expectativas.`
  }

  if (input.includes("envío") || input.includes("entrega") || input.includes("recibir")) {
    return `El tiempo de entrega para ${productName} es de 2 a 5 días hábiles, dependiendo de tu ubicación. Los envíos a capitales suelen ser más rápidos. Puedes seguir el estado de tu pedido desde tu cuenta una vez realizada la compra.`
  }

  if (input.includes("pago") || input.includes("cuotas") || input.includes("tarjeta")) {
    return `Puedes pagar ${productName} con tarjeta de crédito en hasta 12 cuotas sin interés, dependiendo de tu banco. También aceptamos transferencias bancarias, efectivo en puntos de pago y billeteras digitales.`
  }

  if (input.includes("descuento") || input.includes("promoción") || input.includes("oferta")) {
    return `Actualmente tenemos promociones especiales para suscriptores de Tech51. Si te suscribes, podrás acceder a un 5% adicional en tu primera compra. Además, tenemos descuentos por pago en efectivo o transferencia.`
  }

  if (input.includes("stock") || input.includes("disponible") || input.includes("disponibilidad")) {
    return `${productName} se encuentra disponible en stock. Puedes realizar tu compra ahora mismo y lo enviaremos de inmediato. Recuerda que puedes ver la disponibilidad exacta en la información del producto.`
  }

  if (input.includes("gracias") || input.includes("thanks") || input.includes("agradezco")) {
    return `¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas sobre ${productName} o cualquier otro producto, no dudes en consultarme.`
  }

  // Respuesta genérica si no se detectan palabras clave
  return `Gracias por tu pregunta sobre ${productName}. Nuestro equipo de atención al cliente estará encantado de brindarte información más detallada. También puedes llamarnos al 0800-TECH51 o enviarnos un email a soporte@tech51.com para asistencia personalizada.`
}

export default ChatAssistant

