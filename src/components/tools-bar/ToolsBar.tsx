import './ToolsBar.css'
import { InputAdornment, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import tedoooIcon from '../../assets/tedooo-logo.svg'
import homeIcon from '../../assets/home-icon.svg'
import messageIcon from '../../assets/message-circle-icon.svg'
import bellIcon from '../../assets/bell-icon.svg'
import userAvatar from '../../assets/user-avatar.svg'
import { IToolsBar } from '../../interfaces'

export const ToolsBar = ({ inputValue, handleChange }: IToolsBar) => {

    const navLinks: { text: string, icon: string }[] = [{ text: 'Home', icon: homeIcon }, { text: 'Messaging', icon: messageIcon }, { text: 'Notifications', icon: bellIcon },]

    return (
        <div className='tools-bar--container'>
            <div className='tools-bar--search'>
                <img width='40px' src={tedoooIcon} alt='Tedooo icon' />
                <TextField
                    placeholder="Search"
                    size="small"
                    value={inputValue}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '32px',
                            backgroundColor: '#f4f5f5',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                    }}
                />
            </div>
            <div className='tools-bar--navbar'>
                <div className='navbar-links'>{navLinks.map(({ text, icon }) => <div className='navbar-link' key={text}><img width='18px' height='18px' src={icon} alt={`${text} icon`} /> <span>{text}</span></div>)}</div>
                <img src={userAvatar} alt='User avatar' />
            </div>
        </div>
    )
}
