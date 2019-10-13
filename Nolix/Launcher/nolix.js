define("Core/Container/ListNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListNode {
        constructor(element) {
            if (element == null) {
                throw new Error("The given element is null.");
            }
            this.element = element;
        }
        contains(element) {
            return (Object.is(this.element, element));
        }
        getRefElement() {
            return this.element;
        }
        getRefNextNode() {
            if (this.nextNode == null) {
                throw new Error("The current list node does not have a next node.");
            }
            return this.nextNode;
        }
        hasNextNode() {
            return (this.nextNode != null);
        }
        hasNextNodeWith(element) {
            return (this.hasNextNode != null && this.nextNode.element == element);
        }
        removeNextNode() {
            this.nextNode = null;
        }
        setNextNode(nextNode) {
            if (nextNode == null) {
                throw new Error("The given next node is null.");
            }
            this.nextNode = nextNode;
        }
    }
    exports.ListNode = ListNode;
});
define("Core/Container/ListIterator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListIterator {
        constructor(currentNode) {
            this.currentNode = null;
            this.lastElement = null;
            this.currentNode = currentNode;
        }
        next() {
            if (this.currentNode == null) {
                return { done: true, value: null };
            }
            this.lastElement = this.currentNode.getRefElement();
            if (!this.currentNode.hasNextNode()) {
                this.currentNode = null;
                return { done: false, value: this.lastElement };
            }
            this.currentNode = this.currentNode.getRefNextNode();
            return { done: false, value: this.lastElement };
        }
        return() {
            return { done: true, value: this.lastElement };
        }
    }
    exports.ListIterator = ListIterator;
});
define("Core/Container/List", ["require", "exports", "Core/Container/ListIterator", "Core/Container/ListNode"], function (require, exports, ListIterator_1, ListNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class List {
        constructor() {
            this.elementCount = 0;
            this.beginNode = null;
            this.endNode = null;
        }
        addAtBegin(element) {
            const newNode = new ListNode_1.ListNode(element);
            if (this.elementCount == 0) {
                this.endNode = newNode;
            }
            else {
                newNode.setNextNode(this.beginNode);
            }
            this.beginNode = newNode;
            this.elementCount++;
        }
        addAtEnd(element) {
            const newNode = new ListNode_1.ListNode(element);
            if (this.elementCount == 0) {
                this.beginNode = newNode;
            }
            else {
                this.endNode.setNextNode(newNode);
            }
            this.endNode = newNode;
            this.elementCount++;
        }
        clear() {
            if (this.elementCount > 0) {
                this.beginNode = null;
                this.endNode = null;
                this.elementCount = 0;
            }
        }
        contains(element) {
            for (const e of this) {
                if (Object.is(e, element)) {
                    return true;
                }
            }
            return false;
        }
        contains2(selector) {
            for (const e of this) {
                if (selector(e)) {
                    return true;
                }
            }
            return false;
        }
        containsAny() {
            return (this.elementCount > 0);
        }
        containsOne() {
            return (this.elementCount == 1);
        }
        forEach(elementTaker) {
            for (const e of this) {
                elementTaker(e);
            }
        }
        getOneAsString() {
            return this.getRefOne().toString();
        }
        getRefAt(index) {
            if (index < 1) {
                throw new Error('The given index is not positive.');
            }
            var i = 1;
            for (const e of this) {
                if (i == index) {
                    return e;
                }
                i++;
            }
            throw new Error('The given index is bigger than the size of the current List.');
        }
        getRefFirst() {
            if (this.elementCount == 0) {
                throw new Error("The current List is empty.");
            }
            return this.beginNode.getRefElement();
        }
        getRefFirstOrNull(selector) {
            for (const e of this) {
                if (selector(e)) {
                    return e;
                }
            }
            return null;
        }
        getRefLast() {
            if (this.elementCount == 0) {
                throw new Error("The current List is empty.");
            }
            return this.endNode.getRefElement();
        }
        getRefOne() {
            if (!this.containsOne()) {
                throw new Error('The current List contains none or several elements.');
            }
            return this.beginNode.getRefElement();
        }
        getRefSelected(selector) {
            const selectedElements = new List();
            for (const e of this) {
                if (selector(e)) {
                    selectedElements.addAtEnd(e);
                }
            }
            return selectedElements;
        }
        getSize() {
            return this.elementCount;
        }
        isEmpty() {
            return (this.elementCount == 0);
        }
        removeFirst() {
            if (this.elementCount == 0) {
                throw new Error('The current List is empty.');
            }
            if (this.containsOne()) {
                this.clear();
            }
            else {
                this.beginNode = this.beginNode.getRefNextNode();
                this.elementCount--;
            }
        }
        removeFirst2(element) {
            if (this.elementCount == 0) {
                return;
            }
            if (element == this.getRefFirst()) {
                this.removeFirst();
                return;
            }
            var iteratorNode = this.beginNode;
            while (iteratorNode.hasNextNode()) {
                if (iteratorNode.hasNextNodeWith(element)) {
                    this.removeNextNode(iteratorNode);
                    return;
                }
                iteratorNode = iteratorNode.getRefNextNode();
            }
            throw new Error('The current List does not contain the given element.');
        }
        toString() {
            return this.toString2(',');
        }
        toString2(separator) {
            if (separator == null) {
                throw new Error('The given separator is null.');
            }
            var string = '';
            var begin = true;
            for (const e of this) {
                if (begin) {
                    string += e.toString();
                    begin = false;
                }
                else {
                    string += separator + e.toString();
                }
            }
            return string;
        }
        toStringInBrackets() {
            return ('(' + this.toString() + ')');
        }
        toStrings() {
            const strings = new List();
            for (const e of this) {
                strings.addAtEnd(e.toString());
            }
            return strings;
        }
        [Symbol.iterator]() {
            return new ListIterator_1.ListIterator(this.beginNode);
        }
        removeNextNode(node) {
            const nextNode = node.getRefNextNode();
            if (!nextNode.hasNextNode()) {
                nextNode.removeNextNode();
                this.endNode = node;
            }
            else {
                node.setNextNode(nextNode.getRefNextNode());
            }
            this.elementCount--;
            nextNode.removeNextNode();
        }
    }
    exports.List = List;
});
define("Core/Container/SingleContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SingleContainer {
        clear() {
            this.element = null;
        }
        contains(element) {
            if (element == null) {
                throw new Error('The given element is null.');
            }
            return (Object.is(this.element, element));
        }
        containsAny() {
            return (this.element != null);
        }
        getRefElement() {
            if (this.element == null) {
                throw new Error('The current single container does not have an element.');
            }
            return this.element;
        }
        isEmpty() {
            return (this.element == null);
        }
        setElement(element) {
            if (element == null) {
                throw new Error('The given element is null.');
            }
            this.element = element;
        }
    }
    exports.SingleContainer = SingleContainer;
});
define("Core/DocumentNode/DocumentNode", ["require", "exports", "Core/Container/List"], function (require, exports, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DocumentNode {
        constructor() {
            this.attributes = new List_1.List();
        }
        static createFromString(string) {
            const documentNode = new DocumentNode();
            documentNode.set(string);
            return documentNode;
        }
        addAttribute(attribute) {
            this.attributes.addAtEnd(attribute.getCopy());
            return this;
        }
        containsAttributes() {
            return this.attributes.containsAny();
        }
        getAttributeCount() {
            return this.attributes.getSize();
        }
        getCopy() {
            var copy = new DocumentNode();
            if (this.header != null) {
                copy.setHeader(this.getHeader());
            }
            this.attributes.forEach(a => copy.addAttribute(a));
            return copy;
        }
        getHeader() {
            if (this.header == null) {
                throw new Error("The current document node does not have a header.");
            }
            return this.header;
        }
        getOneAttributeAsString() {
            return this.getRefOneAttribute().toString();
        }
        getRefAttributes() {
            return this.attributes;
        }
        getRefOneAttribute() {
            return this.attributes.getRefOne();
        }
        getReproducingHeader() {
            return (this.getHeader()
                .replace('$', DocumentNode.DOLLAR_SYMBOL_CODE)
                .replace('(', DocumentNode.OPEN_BRACKET_CODE)
                .replace(')', DocumentNode.CLOSED_BRACKET_CODE)
                .replace(',', DocumentNode.COMMA_CODE));
        }
        hasHeader() {
            return (this.header != null);
        }
        removeAttributes() {
            this.attributes.clear();
        }
        removeHeader() {
            this.header = null;
        }
        reset() {
            this.removeHeader();
            this.removeAttributes();
        }
        set(string) {
            this.reset();
            if (this.setAndGetEndIndex(string, 0) != string.length - 1) {
                throw new Error('The given string does not represent a document node.');
            }
        }
        setHeader(header) {
            if (header == null) {
                throw new Error("The given header is null.");
            }
            if (header.length == 0) {
                throw new Error("The given header is empty.");
            }
            this.header = header;
            return this;
        }
        toString() {
            var string = '';
            if (this.header != null) {
                string += this.getHeader();
            }
            if (this.attributes.containsAny()) {
                string += '(' + this.getRefAttributes().toString() + ')';
            }
            return string;
        }
        setAndGetEndIndex(string, startIndex) {
            var index = startIndex;
            var endIndex = -1;
            while (index < string.length) {
                const character = string[index];
                if (character == '(') {
                    break;
                }
                else if (character == ',' || character == ')') {
                    endIndex = index - 1;
                    break;
                }
                index++;
            }
            if (index > startIndex) {
                this.setHeader(string.substring(startIndex, index));
            }
            if (index == string.length) {
                return (index - 1);
            }
            if (endIndex != -1) {
                return endIndex;
            }
            if (index < string.length) {
                const documentNode = new DocumentNode();
                index = documentNode.setAndGetEndIndex(string, index + 1) + 1;
                this.addAttribute(documentNode);
            }
            while (index < string.length) {
                switch (string[index]) {
                    case ',':
                        const documentNode = new DocumentNode();
                        index = documentNode.setAndGetEndIndex(string, index + 1) + 1;
                        this.addAttribute(documentNode);
                        break;
                    case ')':
                        return index;
                    default:
                        throw new Error('The given string does not represent a document node.');
                }
            }
        }
    }
    DocumentNode.OPEN_BRACKET_CODE = '$O';
    DocumentNode.CLOSED_BRACKET_CODE = '$C';
    DocumentNode.COMMA_CODE = '$M';
    DocumentNode.DOLLAR_SYMBOL_CODE = '$D';
    exports.DocumentNode = DocumentNode;
});
define("Core/EndPoint2/NetEndPoint2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NetEndPoint2 {
        constructor(ip, port, optionalTarget) {
            if (ip == null) {
                throw new Error('The given ip is null.');
            }
            if (ip.length == 0) {
                throw new Error('The given ip is empty.');
            }
            if (port < 0 || port > 65535) {
                throw new Error('The given port is not in [0, 65535].');
            }
            if (optionalTarget.containsAny()) {
                if (optionalTarget.getRefElement().length == 0) {
                    throw new Error('The given target is empty.');
                }
                this.target = optionalTarget.getRefElement();
            }
            const targetMessage = (this.target == null) ?
                NetEndPoint2.CLEAR_TARGET_MESSAGE_PREFIX :
                NetEndPoint2.TARGET_MESSAGE_PREFIX + '(' + this.target + ')';
            this.webSocket = new WebSocket(ip + ':' + port);
            this.webSocket.onmessage = e => this.receiveMessageEvent(e);
            this.webSocket.send(targetMessage);
        }
        getTarget() {
            if (this.target == null) {
                throw new Error('The current net end point 2 does not have a target.');
            }
            return this.target;
        }
        hasReceiver() {
            return (this.receiver != null);
        }
        hasTarget() {
            return (this.target != null);
        }
        send(message) {
            this.webSocket.send(NetEndPoint2.STANDARD_MESSAGE_PREFIX + message);
        }
        setReceiver(receiver) {
            if (receiver == null) {
                throw new Error('The given receiver is null.');
            }
            this.receiver = receiver;
        }
        receive(message) {
            if (message == null) {
                throw new Error('The given message is null.');
            }
            if (message.length == 0) {
                throw new Error('The given message is empty.');
            }
            switch (message[0]) {
                case NetEndPoint2.STANDARD_MESSAGE_PREFIX:
                    if (this.receiver == null) {
                        throw new Error('The current NetEndPoint2 does not have a receiver.');
                    }
                    this.receiver(message);
                    break;
                default:
                    throw new Error('The given message is not valid.');
            }
        }
        receiveMessageEvent(messageEvent) {
            this.receive(messageEvent.data);
        }
    }
    NetEndPoint2.STANDARD_MESSAGE_PREFIX = 'S';
    NetEndPoint2.TARGET_MESSAGE_PREFIX = 'T';
    NetEndPoint2.CLEAR_TARGET_MESSAGE_PREFIX = 'C';
    exports.NetEndPoint2 = NetEndPoint2;
});
define("Core/EndPoint3/MessageRole", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageRole;
    (function (MessageRole) {
        MessageRole[MessageRole["TARGET_MESSAGE"] = 0] = "TARGET_MESSAGE";
        MessageRole[MessageRole["STANDARD_MESSAGE"] = 1] = "STANDARD_MESSAGE";
        MessageRole[MessageRole["REPLY_MESSAGE"] = 2] = "REPLY_MESSAGE";
        MessageRole[MessageRole["ERROR_MESSAGE"] = 3] = "ERROR_MESSAGE";
    })(MessageRole = exports.MessageRole || (exports.MessageRole = {}));
});
define("Core/EndPoint3/Package", ["require", "exports", "Core/EndPoint3/MessageRole"], function (require, exports, MessageRole_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Package {
        constructor(index, messageRole, message) {
            if (index < 1) {
                throw new Error('The given index is not positive.');
            }
            if (messageRole == null) {
                throw new Error('The given message role is null.');
            }
            if (message == null) {
                throw new Error('The given message isn ull.');
            }
            this.index = index;
            this.message = message;
            this.messageRole = messageRole;
        }
        static createFromString(string) {
            return new Package(Number.parseInt(string.substring(0, 8)), Package.createMessageRole(string.substring(8, 9)), string.substring(9, string.length));
        }
        static createMessageRole(messageRolePrefix) {
            switch (messageRolePrefix) {
                case Package.TARGET_MESSAGE_PREFIX:
                    return MessageRole_1.MessageRole.TARGET_MESSAGE;
                case Package.STANDARD_MESSAGE_PREFIX:
                    return MessageRole_1.MessageRole.STANDARD_MESSAGE;
                case Package.REPLY_MESSAGE_PREFIX:
                    return MessageRole_1.MessageRole.REPLY_MESSAGE;
                case Package.ERROR_MESSAGE_PREFIX:
                    return MessageRole_1.MessageRole.ERROR_MESSAGE;
                default:
                    throw new Error('The given message role prefix is not valid.');
            }
        }
        getIndex() {
            return this.index;
        }
        getMessage() {
            return this.message;
        }
        getMessageRole() {
            return this.messageRole;
        }
        hasIndex(index) {
            return this.index == index;
        }
        toString() {
            return (this.getIndexString() + this.getMessageRolePrefix() + this.message);
        }
        getIndexString() {
            var indexString = this.index.toString();
            while (indexString.length < Package.INDEX_STRING_LENGTH) {
                indexString = '0' + indexString;
            }
            return indexString;
        }
        getMessageRolePrefix() {
            switch (this.messageRole) {
                case MessageRole_1.MessageRole.TARGET_MESSAGE:
                    return Package.TARGET_MESSAGE_PREFIX;
                case MessageRole_1.MessageRole.STANDARD_MESSAGE:
                    return Package.STANDARD_MESSAGE_PREFIX;
                case MessageRole_1.MessageRole.REPLY_MESSAGE:
                    return Package.REPLY_MESSAGE_PREFIX;
                case MessageRole_1.MessageRole.ERROR_MESSAGE:
                    return Package.ERROR_MESSAGE_PREFIX;
                default:
                    throw new Error('There is not defined a prefix for the given message role.');
            }
        }
    }
    Package.TARGET_MESSAGE_PREFIX = 'T';
    Package.STANDARD_MESSAGE_PREFIX = 'M';
    Package.REPLY_MESSAGE_PREFIX = 'R';
    Package.ERROR_MESSAGE_PREFIX = 'E';
    Package.INDEX_STRING_LENGTH = 8;
    exports.Package = Package;
});
define("Core/EndPoint3/NetEndPoint3", ["require", "exports", "Core/Container/List", "Core/EndPoint3/MessageRole", "Core/EndPoint2/NetEndPoint2", "Core/EndPoint3/Package"], function (require, exports, List_2, MessageRole_2, NetEndPoint2_1, Package_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NetEndPoint3 {
        constructor(ip, port, optionalTarget) {
            this.messageIndex = 0;
            this.receivedPackages = new List_2.List();
            this.internalNetEndPoint = new NetEndPoint2_1.NetEndPoint2(ip, port, optionalTarget);
            this.internalNetEndPoint.setReceiver(m => this.receive(m));
        }
        getTarget() {
            return this.internalNetEndPoint.getTarget();
        }
        hasReceiver() {
            return (this.receiver != null);
        }
        hasTarget() {
            return this.internalNetEndPoint.hasTarget();
        }
        sendAndGetReply(message) {
            const messageIndex = this.getNextMessageIndex();
            this.sendPackage(new Package_1.Package(messageIndex, MessageRole_2.MessageRole.STANDARD_MESSAGE, message));
            const receivedPackage = this.waitToAndGetAndRemoveReceivedPackage(messageIndex);
            switch (receivedPackage.getMessageRole()) {
                case MessageRole_2.MessageRole.REPLY_MESSAGE:
                    return receivedPackage.getMessage();
                case MessageRole_2.MessageRole.ERROR_MESSAGE:
                    throw new Error(receivedPackage.getMessage());
                default:
                    throw Error('The received packge is not valid.');
            }
        }
        setReceiver(receiver) {
            if (receiver == null) {
                throw new Error('The given receiver is null.');
            }
            this.receiver = receiver;
        }
        getNextMessageIndex() {
            this.messageIndex++;
            return this.messageIndex;
        }
        receive(message) {
            this.receivePackage(Package_1.Package.createFromString(message));
        }
        receivePackage(package_) {
            switch (package_.getMessageRole()) {
                case MessageRole_2.MessageRole.STANDARD_MESSAGE:
                    if (this.receiver == null) {
                        throw new Error('The current net end point does not have a receiver.');
                    }
                    try {
                        this.sendPackage(new Package_1.Package(package_.getIndex(), MessageRole_2.MessageRole.REPLY_MESSAGE, this.receiver(package_.getMessage())));
                    }
                    catch (error) {
                        this.sendPackage(new Package_1.Package(package_.getIndex(), MessageRole_2.MessageRole.ERROR_MESSAGE, error));
                    }
                    break;
                case MessageRole_2.MessageRole.REPLY_MESSAGE:
                case MessageRole_2.MessageRole.ERROR_MESSAGE:
                    this.receivedPackages.addAtEnd(package_);
                    break;
                default:
                    throw new Error('The received package is not valid.');
            }
        }
        sendPackage(package_) {
            this.internalNetEndPoint.send(package_.toString());
        }
        waitToAndGetAndRemoveReceivedPackage(index) {
            const startTimeInMilliseconds = new Date().getMilliseconds();
            while (new Date().getMilliseconds() - startTimeInMilliseconds < NetEndPoint3.TIMEOUT_IN_MILLISECONDS) {
                const package_ = this.receivedPackages.getRefFirstOrNull(rp => rp.hasIndex(index));
                if (package_ != null) {
                    this.receivedPackages.removeFirst2(package_);
                    return package_;
                }
            }
            throw new Error('The current net end point reached the timeout by waiting to a message.');
        }
    }
    NetEndPoint3.TIMEOUT_IN_MILLISECONDS = 5000;
    NetEndPoint3.MESSAGE_PREFIX = 'M';
    exports.NetEndPoint3 = NetEndPoint3;
});
define("Core/EndPoint5/IDataProviderController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Core/Statement/Statement", ["require", "exports", "Core/Container/SingleContainer"], function (require, exports, SingleContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Statement {
        constructor(documentNode, optionalNextStatement) {
            if (documentNode == null) {
                throw new Error('The given documentNode is null.');
            }
            this.documentNode = documentNode;
            if (optionalNextStatement.containsAny()) {
                this.nextStatement = optionalNextStatement.getRefElement();
            }
        }
        getCopy() {
            var optionalNextStatement = new SingleContainer_1.SingleContainer();
            if (this.nextStatement != null) {
                optionalNextStatement.setElement(this.getRefNextStatement().getCopy());
            }
            return new Statement(this.documentNode.getCopy(), optionalNextStatement);
        }
        getHeader() {
            return this.documentNode.getHeader();
        }
        getRefAttributes() {
            return this.documentNode.getRefAttributes();
        }
        getRefNextStatement() {
            if (this.nextStatement == null) {
                throw new Error('The current Statement does not have a next statement.');
            }
            return this.nextStatement;
        }
        hasHeader() {
            return this.documentNode.hasHeader();
        }
        hasNextStatement() {
            return (this.nextStatement != null);
        }
        toString() {
            var string = this.documentNode.toString();
            if (this.nextStatement != null) {
                string += '.' + this.nextStatement.toString();
            }
            return string;
        }
        toStringInBrackes() {
            return ('(' + this.toString() + ')');
        }
    }
    exports.Statement = Statement;
});
define("Core/EndPoint5/NetEndPoint5", ["require", "exports", "Core/Container/List", "Core/EndPoint3/NetEndPoint3", "Core/DocumentNode/DocumentNode"], function (require, exports, List_3, NetEndPoint3_1, DocumentNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NetEndPoint5 {
        constructor(ip, port, optionalTarget) {
            this.internalNetEndPoint = new NetEndPoint3_1.NetEndPoint3(ip, port, optionalTarget);
        }
        getData(request) {
            const message = 'Data' + request.toStringInBrackes();
            const reply = DocumentNode_1.DocumentNode.createFromString(this.internalNetEndPoint.sendAndGetReply(message));
            switch (reply.getHeader()) {
                case 'Data':
                    return reply.getRefOneAttribute();
                case 'Error':
                    throw new Error(reply.getOneAttributeAsString());
            }
        }
        getTarget() {
            return this.internalNetEndPoint.getTarget();
        }
        run(command) {
            const commands = new List_3.List();
            commands.addAtEnd(command);
            this.runCommands(commands);
        }
        runCommands(commands) {
            const message = 'Commands' + commands.toStringInBrackets();
            const reply = new DocumentNode_1.DocumentNode();
            reply.set(this.internalNetEndPoint.sendAndGetReply(message));
            switch (reply.getHeader()) {
                case 'Done':
                    break;
                case 'Error':
                    throw new Error(reply.getOneAttributeAsString());
            }
        }
        setReceiverController(receiverController) {
            if (receiverController == null) {
                throw new Error('The given receiverController is null');
            }
            this.receiverController = receiverController;
        }
    }
    exports.NetEndPoint5 = NetEndPoint5;
});
define("Core/Helper/StringHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringHelper {
        static createStringOfSpaces(spaceCount) {
            if (spaceCount < 0) {
                throw new Error('The given space count is negative.');
            }
            var string = '';
            for (var i = 1; i <= spaceCount; i++) {
                string += ' ';
            }
            return string;
        }
    }
    exports.StringHelper = StringHelper;
});
define("Core/Test/NumberMediator", ["require", "exports", "Core/Test/Mediator"], function (require, exports, Mediator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NumberMediator extends Mediator_1.Mediator {
        constructor(test, argument) {
            super(test, argument);
        }
    }
    exports.NumberMediator = NumberMediator;
});
define("Core/Test/StringMediator", ["require", "exports", "Core/Test/Mediator"], function (require, exports, Mediator_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringMediator extends Mediator_2.Mediator {
        constructor(test, argument) {
            super(test, argument);
        }
        isNotEmpty() {
            if (this.argument.length < 1) {
                this.test.internal_addErrorToCurrentTestCase('A string, that is not empty, was expected, but an empty string was received.');
            }
        }
    }
    exports.StringMediator = StringMediator;
});
define("Core/Testoid/Testoid", ["require", "exports", "Core/Container/List"], function (require, exports, List_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Testoid {
        constructor() {
            this.currentTestCaseErrors = new List_4.List();
        }
        run() {
            var prototype = this;
            var properties = [];
            do {
                properties = properties.concat(Object.getOwnPropertyNames(prototype));
            } while (prototype = Object.getPrototypeOf(prototype));
            for (const p of properties) {
                const name = p;
                if (name.startsWith('testCase_')) {
                    try {
                        this[name]();
                        if (this.currentTestCaseErrors.isEmpty()) {
                            console.log('PASSED: ' + name);
                        }
                        else {
                            console.log('FAILED: ' + name);
                        }
                    }
                    catch (error) {
                        console.log('FAILED ' + name + ': ' + error);
                    }
                    var i = 1;
                    for (const e of this.currentTestCaseErrors) {
                        console.log('   ' + i.toString() + ') ' + e);
                        i++;
                    }
                    this.currentTestCaseErrors.clear();
                }
            }
        }
        internal_addErrorToCurrentTestCase(error) {
            this.currentTestCaseErrors.addAtEnd(error);
        }
    }
    exports.Testoid = Testoid;
});
define("Core/Test/Test", ["require", "exports", "Core/Test/FunctionMediator", "Core/Test/NumberMediator", "Core/Test/StringMediator", "Core/Testoid/Testoid"], function (require, exports, FunctionMediator_1, NumberMediator_1, StringMediator_1, Testoid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Test extends Testoid_1.Testoid {
        expect(argument) {
            if (!argument) {
                this.internal_addErrorToCurrentTestCase('True was expected, but false was received.');
            }
        }
        expectFunction(argument) {
            return new FunctionMediator_1.FunctionMediator(this, argument);
        }
        expectNot(argument) {
            if (argument) {
                this.internal_addErrorToCurrentTestCase('False was expected, but true was received.');
            }
        }
        expectNotThisCase() {
            this.internal_addErrorToCurrentTestCase('The current case was not expected, but reached.');
        }
        expectNumber(argument) {
            return new NumberMediator_1.NumberMediator(this, argument);
        }
        expectString(argument) {
            return new StringMediator_1.StringMediator(this, argument);
        }
    }
    exports.Test = Test;
});
define("Core/Test/Mediator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mediator {
        constructor(test, argument) {
            if (test == null) {
                throw new Error('The given test is null.');
            }
            this.test = test;
            this.argument = argument;
        }
        equals(value) {
            if (this.argument != value) {
                this.test.internal_addErrorToCurrentTestCase('An object that equals ' + value.toString() + ' was expected, but ' + this.argument.toString() + ' was received.');
            }
        }
        fulfills(condition) {
            if (!condition(this.argument)) {
                this.test.internal_addErrorToCurrentTestCase('An object, that fulfills the given condition, was expected, but an object, that does not fulfill it, was received.');
            }
        }
        isNotNull() {
            if (this.argument == null) {
                this.test.internal_addErrorToCurrentTestCase('An object was expected, but null was received.');
            }
        }
        isSameAs(object) {
            if (!Object.is(this.argument, object)) {
                this.test.internal_addErrorToCurrentTestCase('The given object was expected, but another object was received.');
            }
        }
    }
    exports.Mediator = Mediator;
});
define("Core/Test/ThrownErrorMediator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ThrownErrorMediator {
        constructor(test, error) {
            if (test == null) {
                throw new Error('The given test is null.');
            }
            if (error == null) {
                throw new Error('The given error is null.');
            }
            this.test = test;
            this.error = error;
        }
        withMessage(message) {
            if (message == null) {
                throw new Error('The given message is null.');
            }
            if (this.error.message != message) {
                this.test.internal_addErrorToCurrentTestCase('An error with the message \''
                    + message
                    + '\' was expected, but an error with the message \''
                    + this.error.message
                    + '\' was received.');
            }
        }
    }
    exports.ThrownErrorMediator = ThrownErrorMediator;
});
define("Core/Test/FunctionMediator", ["require", "exports", "Core/Test/Mediator", "Core/Test/ThrownErrorMediator"], function (require, exports, Mediator_3, ThrownErrorMediator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FunctionMediator extends Mediator_3.Mediator {
        constructor(test, argument) {
            super(test, argument);
        }
        doesNotThrowError() {
            try {
                this.argument();
            }
            catch (error) {
                this.test.internal_addErrorToCurrentTestCase('There was not expected any error, but there was thrown an error.');
            }
        }
        throwsError() {
            try {
                this.argument();
                this.test.internal_addErrorToCurrentTestCase('An error was expected, but there was not thrown any error.');
            }
            catch (error) {
                return new ThrownErrorMediator_1.ThrownErrorMediator(this.test, error);
            }
        }
    }
    exports.FunctionMediator = FunctionMediator;
});
define("Core/Test/TestPool", ["require", "exports", "Core/Container/List"], function (require, exports, List_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestPool {
        constructor() {
            this.tests = new List_5.List();
            this.testPools = new List_5.List();
        }
        run() {
            this.tests.forEach(t => t.run());
            this.testPools.forEach(tp => tp.run());
        }
        addTest(test) {
            this.tests.addAtEnd(test);
        }
        addTestPool(testPool) {
            if (testPool.containsRecursively(this)) {
                throw new Error('The given test pool contains the current test pool recursively.');
            }
            this.testPools.addAtEnd(testPool);
        }
        containsRecursively(testPool) {
            if (this.testPools.contains(testPool)) {
                return true;
            }
            return this.testPools.contains2(ts => ts.containsRecursively(testPool));
        }
    }
    exports.TestPool = TestPool;
});
define("CoreTest/ContainerTest/ListTest", ["require", "exports", "Core/Container/List", "Core/Test/Test"], function (require, exports, List_6, Test_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ListTest extends Test_1.Test {
        testCase_addAtBegin_WhenNullIsGiven() {
            const list = new List_6.List();
            this.expectFunction(() => list.addAtBegin(null)).throwsError();
        }
        testCase_addAtEnd() {
            const list = new List_6.List();
            const apple = 'apple';
            const banana = 'banana';
            const cerish = 'cerish';
            list.addAtEnd(apple);
            list.addAtEnd(banana);
            list.addAtEnd(cerish);
            this.expectNumber(list.getSize()).equals(3);
            this.expectString(list.getRefAt(1)).isSameAs(apple);
            this.expectString(list.getRefAt(2)).isSameAs(banana);
            this.expectString(list.getRefAt(3)).isSameAs(cerish);
        }
        testCase_addAtEnd_WhenNullIsGiven() {
            const list = new List_6.List();
            this.expectFunction(() => list.addAtEnd(null)).throwsError();
        }
        testCase_clear() {
            const list = new List_6.List();
            list.addAtEnd('apple');
            list.addAtEnd('banana');
            list.addAtEnd('cerish');
            this.expectNumber(list.getSize()).equals(3);
            list.clear();
            this.expect(list.isEmpty());
        }
        testCase_constructor() {
            const list = new List_6.List();
            this.expect(list.isEmpty());
        }
        testCase_contains() {
            const apple = 'apple';
            const banana = 'banana';
            const cerish = 'cerish';
            const lemon = 'lemon';
            const list = new List_6.List();
            list.addAtEnd(apple);
            list.addAtEnd(banana);
            list.addAtEnd(cerish);
            this.expectNumber(list.getSize()).equals(3);
            this.expect(list.contains(apple));
            this.expect(list.contains(banana));
            this.expect(list.contains(cerish));
            this.expectNot(list.contains(lemon));
        }
        testCase_iterator_whenListContains3Elements() {
            const apple = 'apple';
            const banana = 'banana';
            const cerish = 'cerish';
            const lemon = 'lemon';
            const list = new List_6.List();
            list.addAtEnd(apple);
            list.addAtEnd(banana);
            list.addAtEnd(cerish);
            var i = 1;
            for (const e of list) {
                switch (i) {
                    case 1:
                        this.expectString(e).isSameAs(apple);
                        break;
                    case 2:
                        this.expectString(e).isSameAs(banana);
                        break;
                    case 3:
                        this.expectString(e).isSameAs(cerish);
                        break;
                    default:
                        this.expectNotThisCase();
                }
                i++;
            }
        }
        testCase_iterator_whenListIsEmpty() {
            const list = new List_6.List();
            var foundElement = false;
            for (const e of list) {
                foundElement = true;
            }
            this.expectNot(foundElement);
        }
        testCase_removeFirst() {
            const apple = 'apple';
            const banana = 'banana';
            const cerish = 'cerish';
            const list = new List_6.List();
            list.addAtEnd(apple);
            list.addAtEnd(banana);
            list.addAtEnd(cerish);
            this.expectNumber(list.getSize()).equals(3);
            this.expectString(list.getRefFirst()).isSameAs(apple);
            list.removeFirst();
            this.expectNumber(list.getSize()).equals(2);
            this.expectString(list.getRefFirst()).isSameAs(banana);
        }
    }
    exports.ListTest = ListTest;
});
define("CoreTest/DocumentNodeTest/DocumentNodeTest", ["require", "exports", "Core/DocumentNode/DocumentNode", "Core/Test/Test"], function (require, exports, DocumentNode_2, Test_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DocumentNodeTest extends Test_2.Test {
        testCase_addAttribute() {
            const documentNode = new DocumentNode_2.DocumentNode();
            const attribute1 = new DocumentNode_2.DocumentNode();
            const attribute2 = new DocumentNode_2.DocumentNode();
            const attribtue3 = new DocumentNode_2.DocumentNode();
            this.expectNot(documentNode.containsAttributes());
            documentNode.addAttribute(attribute1);
            documentNode.addAttribute(attribute2);
            documentNode.addAttribute(attribtue3);
            this.expectNumber(documentNode.getAttributeCount()).equals(3);
        }
        testCase_set() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('');
            this.expectString(documentNode.toString()).equals('');
        }
        testCase_set2() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A');
            this.expectString(documentNode.toString()).equals('A');
        }
        testCase_set3() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A(B)');
            this.expectString(documentNode.toString()).equals('A(B)');
        }
        testCase_set4() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A(B1,B2,B3)');
            this.expectString(documentNode.toString()).equals('A(B1,B2,B3)');
        }
        testCase_set5() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A(B(C))');
            this.expectString(documentNode.toString()).equals('A(B(C))');
        }
        testCase_set6() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A(B1(C1),B2(C2))');
            this.expectString(documentNode.toString()).equals('A(B1(C1),B2(C2))');
        }
        testCase_set7() {
            const documentNode = new DocumentNode_2.DocumentNode();
            documentNode.set('A(B1(C1,C2),B2(C3,C4))');
            this.expectString(documentNode.toString()).equals('A(B1(C1,C2),B2(C3,C4))');
        }
        testCase_setHeader() {
            const documentNode = new DocumentNode_2.DocumentNode();
            this.expectNot(documentNode.hasHeader());
            documentNode.setHeader('H');
            this.expectString(documentNode.getHeader()).equals('H');
        }
    }
    exports.DocumentNodeTest = DocumentNodeTest;
});
define("CoreTest/ContainerTest/SingleContainerTest", ["require", "exports", "Core/Container/SingleContainer", "Core/Test/Test"], function (require, exports, SingleContainer_2, Test_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SingleContainerTest extends Test_3.Test {
        testCase_clear() {
            const singleContainer = new SingleContainer_2.SingleContainer();
            singleContainer.setElement('apple');
            this.expect(singleContainer.containsAny());
            singleContainer.clear();
            this.expect(singleContainer.isEmpty());
        }
        testCase_constructor() {
            const singleContainer = new SingleContainer_2.SingleContainer();
            this.expect(singleContainer.isEmpty());
        }
        testCase_setElement_whenTheGivenElementIsNull() {
            const singleContainer = new SingleContainer_2.SingleContainer();
            this.expectFunction(() => singleContainer.setElement(null))
                .throwsError()
                .withMessage('The given element is null.');
        }
    }
    exports.SingleContainerTest = SingleContainerTest;
});
define("CoreTest/ContainerTest/ContainerTestPool", ["require", "exports", "CoreTest/ContainerTest/ListTest", "Core/Test/TestPool", "CoreTest/DocumentNodeTest/DocumentNodeTest", "CoreTest/ContainerTest/SingleContainerTest"], function (require, exports, ListTest_1, TestPool_1, DocumentNodeTest_1, SingleContainerTest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ContainerTestPool extends TestPool_1.TestPool {
        constructor() {
            super();
            this.addTest(new DocumentNodeTest_1.DocumentNodeTest());
            this.addTest(new ListTest_1.ListTest());
            this.addTest(new SingleContainerTest_1.SingleContainerTest());
        }
    }
    exports.ContainerTestPool = ContainerTestPool;
});
define("CoreTest/DocumentNodeTest/DocumentTestPool", ["require", "exports", "CoreTest/DocumentNodeTest/DocumentNodeTest", "Core/Test/TestPool"], function (require, exports, DocumentNodeTest_2, TestPool_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DocumentTestPool extends TestPool_2.TestPool {
        constructor() {
            super();
            this.addTest(new DocumentNodeTest_2.DocumentNodeTest());
        }
    }
    exports.DocumentTestPool = DocumentTestPool;
});
define("CoreTest/CoreTestPool", ["require", "exports", "Core/Test/TestPool", "CoreTest/ContainerTest/ContainerTestPool", "CoreTest/DocumentNodeTest/DocumentTestPool"], function (require, exports, TestPool_3, ContainerTestPool_1, DocumentTestPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CoreTestPool extends TestPool_3.TestPool {
        constructor() {
            super();
            this.addTestPool(new ContainerTestPool_1.ContainerTestPool());
            this.addTestPool(new DocumentTestPool_1.DocumentTestPool());
        }
    }
    exports.CoreTestPool = CoreTestPool;
});
define("CoreTest/Launcher", ["require", "exports", "CoreTest/CoreTestPool"], function (require, exports, CoreTestPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new CoreTestPool_1.CoreTestPool().run();
});
define("CoreTest/ContainerTest/Launcher", ["require", "exports", "CoreTest/ContainerTest/ListTest"], function (require, exports, ListTest_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new ListTest_2.ListTest().run();
});
define("CoreTest/DocumentNodeTest/Launcher", ["require", "exports", "CoreTest/DocumentNodeTest/DocumentTestPool"], function (require, exports, DocumentTestPool_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new DocumentTestPool_2.DocumentTestPool().run();
});
define("NolixTest/NolixTestPool", ["require", "exports", "CoreTest/CoreTestPool", "Core/Test/TestPool"], function (require, exports, CoreTestPool_2, TestPool_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NolixTestPool extends TestPool_4.TestPool {
        constructor() {
            super();
            this.addTestPool(new CoreTestPool_2.CoreTestPool());
        }
    }
    exports.NolixTestPool = NolixTestPool;
});
define("NolixTest/Launcher", ["require", "exports", "NolixTest/NolixTestPool"], function (require, exports, NolixTestPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new NolixTestPool_1.NolixTestPool().run();
});
