let payload = { msg: "", type: "", show: false };
function setPayload(data) {
    payload = data;
}

export default function useCustomAlert () {

    function success (msg) {
        setPayload({ msg, payload: "successs", show: true });
    }
    function error (msg) {
        setPayload({ msg, payload: "error", show: true });
    }
    function info (msg) {
        setPayload({ msg, payload: "info", show: true });
    }
    function warning (msg) {
        setPayload({ msg, payload: "warning", show: true });
    }
    function hide () {
        setPayload({ msg: "", payload: "", show: false });
    }

    return { payload, success, error, info, warning, hide }
}