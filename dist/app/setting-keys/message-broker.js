"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBroker;
(function (MessageBroker) {
    /**
     * IP or host name of message broker.
     * Data type: string
     */
    MessageBroker["MSG_BROKER_HOST"] = "msgBroker_host";
    /**
     * Exchange name on message broker.
     * Data type: string
     */
    MessageBroker["MSG_BROKER_EXCHANGE"] = "msgBroker_exchange";
    /**
     * Default queue name for RPC handler to connect to.
     * Data type: string
     */
    MessageBroker["MSG_BROKER_HANDLER_QUEUE"] = "msgBroker_handler_queue";
    /**
     * Number of milliseconds to delay before reconnect to message broker.
     * Data type: number
     */
    MessageBroker["MSG_BROKER_RECONN_TIMEOUT"] = "msgBroker_reconnectTimeout";
    /**
     * Username to log into message broker.
     * Data type: string
     */
    MessageBroker["MSG_BROKER_USERNAME"] = "msgBroker_username";
    /**
     * Password to log into message broker.
     * Data type: string
     */
    MessageBroker["MSG_BROKER_PASSWORD"] = "msgBroker_password";
    /**
     * Number of milliseconds that messages live in queue.
     * Data type: number
     */
    MessageBroker["MSG_BROKER_MSG_EXPIRE"] = "msgBroker_msg_expr";
})(MessageBroker = exports.MessageBroker || (exports.MessageBroker = {}));
//# sourceMappingURL=message-broker.js.map