import React, {useState} from 'react'
import {ethers} from 'ethers'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);

			});

		} else {
			console.log('Need to install MetaMask');
			alert('Need to install MetaMask')
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window?.ethereum?.on && window?.ethereum.on('accountsChanged', accountChangedHandler);
	window?.ethereum?.on && window?.ethereum.on('chainChanged', chainChangedHandler);

	return (
		<div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
		<MDBContainer>
			<MDBRow className="justify-content-center">
			<MDBCol md="9" lg="7" xl="5" className="mt-5">
				<MDBCard style={{ borderRadius: '15px' }}>
				<MDBCardBody className="p-4">
					<div className="d-flex text-black">
					<div className="flex-shrink-0">
						<MDBCardImage
						style={{ width: '180px', borderRadius: '10px' }}
						src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
						alt='Generic placeholder image'
						fluid />
					</div>
					<div className="flex-grow-1 ps-3 overflow-auto">
						<MDBCardTitle>Danny McLoan</MDBCardTitle>
						<MDBCardText>Senior Journalist</MDBCardText>

					{!(connButtonText== 'Connect Wallet')? <div className="d-flex justify-content-start rounded-3 p-2 mb-2 overflow-hidden text-break"
						style={{ backgroundColor: '#efefef',overflow:'clip' }}>
						<div>
							<p className="small text-muted mb-1 text-nowrap">Address</p>
							<p className="mb-0">{defaultAccount}</p>
						</div>
						<div className="px-3">
							<p className="small text-muted mb-1 text-nowrap">Balance</p>
							<p className="mb-0">{userBalance}</p>
						</div>
						</div>:
						<div className="d-flex justify-content-start rounded-3 p-2 mb-2"
						style={{ backgroundColor: '#efefef' }}>
						<div>
							<p className="small text-muted mb-1">Please connect wallet</p>
						</div>
						</div>
						}
						<div className="d-flex pt-1">
						<MDBBtn outline className="me-1 flex-grow-1" onClick={connectWalletHandler}>{connButtonText}</MDBBtn>
						</div>
					</div>
					</div>
				</MDBCardBody>
				</MDBCard>
			</MDBCol>
			</MDBRow>
		</MDBContainer>
		</div>
	);
}

export default WalletCard;
