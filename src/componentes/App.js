import React, { Component } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Padrao from './estilos/Padrao'
import { translate } from '../locale/'

export default class App extends Component {

    state = {
        gas: '0,00',
        al: '0,00',
    }

    validar = () => {
        if ((this.state.al || this.state.gas) == '0,00') {
            Alert.alert(
                translate('free'),
                translate('campos')

            )
            this.limpar()
        } else {
            this.converter()
        }
    }

    converter = () => {
        var preco_gas = this.state.gas
        preco_gas = preco_gas.slice(2)
        preco_gas = preco_gas.replace(".", "")
        preco_gas = preco_gas.replace(",", ".")
        preco_gas = parseFloat(preco_gas)

        var preco_al = this.state.al
        preco_al = preco_al.slice(2)
        preco_al = preco_al.replace(".", "")
        preco_al = preco_al.replace(",", ".")
        preco_al = parseFloat(preco_al)

        this.state.gas = preco_gas
        this.state.al = preco_al

        this.calcular()
        this.limpar()
    }

    calcular = () => {
        if (((this.state.gas) * 0.7) > this.state.al) {
            Alert.alert(
                translate('melhor'),
                translate('alc')
            )
        } else {
            Alert.alert(
                translate('melhor'),
                translate('gas')
            )
        }

    }

    limpar = () => {
        this.setState({
            gas: '0,00',
            al: '0,00'
        })
    }

    render() {
        return ([
            <View>
                <Text style={Padrao.titulo}>{translate('gasOuAl')}</Text>
                <Text style={Padrao.op1}>{translate('p_gasolina')}</Text>
                <TextInputMask
                    style={Padrao.op2}
                    type={'money'}
                    value={this.state.gas}
                    onChangeText={text => {
                        this.setState({
                            gas: text
                        })
                    }}
                />
            </View>,
            <View>
                <Text style={Padrao.op1}>{translate('p_alcool')}</Text>
                <TextInputMask
                    style={Padrao.op2}
                    type={'money'}
                    value={this.state.al}
                    onChangeText={text => {
                        this.setState({
                            al: text
                        })
                    }}
                />

            </View >,
            <View style={Padrao.botao}>
                <Button title={translate('calcular')}
                    style={Padrao.botao}
                    onPress={this.validar}
                />
            </View>

        ]

        )

    }
}