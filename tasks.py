from copier import run_copy

frontend_response = run_copy("frontend", "../copier-test/frontend")

answers = frontend_response.answers.user

backend_response = run_copy(
    "smart_contracts",
    "../copier-test/smart_contracts",
    data={**answers, "deployment_language": "typescript"},
)
