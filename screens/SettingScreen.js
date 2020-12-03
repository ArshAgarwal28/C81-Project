import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SettingScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
			doc: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = async () => {
		var user = firebase.auth().currentUser;
		var userId = user.email;
		await db
			.collection('users')
			.where('emailId', '==', userId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var data = doc.data();
					this.setState({
						emailId: userId,
						password: data.password,
						firstName: data.firstName,
						lastName: data.lastName,
						address: data.address,
						doc: data.id,
					});
				});
			});
	};

	updateData = async () => {
		await db.collection('users').doc(this.state.doc).update({
			emailId: this.state.emailId,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
		});
	};

	render() {
		return (
			<View style={{ paddingTop: 50 }}>
				<TextInput
					style={styles.formInput}
					onPress={(text) => {
						this.setState({
							emailId: text,
						});
					}}
					value={this.state.emailId}
				/>

				<TextInput
					style={styles.formInput}
					onPress={(text) => {
						this.setState({
							password: text,
						});
					}}
					value={this.state.password}
				/>

				<TextInput
					style={styles.formInput}
					onPress={(text) => {
						this.setState({
							firstName: text,
						});
					}}
					value={this.state.firstName}
				/>

				<TextInput
					style={styles.formInput}
					onPress={(text) => {
						this.setState({
							lastName: text,
						});
					}}
					value={this.state.lastName}
				/>

				<TextInput
					style={styles.formInput}
					onPress={(text) => {
						this.setState({
							address: text,
						});
					}}
					value={this.state.address}
				/>

				<TouchableOpacity style={styles.formButton}>
					<Text>Update</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formInput: {
		borderWidth: 2,
		padding: 10,
		margin: 5,
		width: 300,
		alignSelf: 'center',
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},

	formButton: {
		borderWidth: 2,
		padding: 7,
		backgroundColor: 'aqua',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginTop: 2,
	},
});
