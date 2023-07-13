import beaker
import pyteal as pt

from smart_contracts.helpers.deployment_standard import (
    deploy_time_immutability_control,
    deploy_time_permanence_control,
)

app = (
    beaker.Application("hello_world")
    .apply(deploy_time_immutability_control)
    .apply(deploy_time_permanence_control)
)


@app.external
def hello(name: pt.abi.String, *, output: pt.abi.String) -> pt.Expr:
    return output.set(pt.Concat(pt.Bytes("Hello, "), name.get()))
