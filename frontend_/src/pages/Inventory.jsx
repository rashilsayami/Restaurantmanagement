import React, { useState } from 'react';
import Bottom from '../components/shared/Bottom';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import Modal from '../components/shared/Modal';

const initialInventory = [
  { id: 1, name: 'Tomatoes', category: 'Vegetables', quantity: 50, unit: 'kg', minStock: 10 },
  { id: 2, name: 'Chicken', category: 'Meat', quantity: 30, unit: 'kg', minStock: 5 },
  { id: 3, name: 'Rice', category: 'Grains', quantity: 100, unit: 'kg', minStock: 20 },
  { id: 4, name: 'Cooking Oil', category: 'Oil', quantity: 40, unit: 'L', minStock: 8 },
];

const categories = ['All', 'Vegetables', 'Meat', 'Grains', 'Oil', 'Spices', 'Dairy'];

const Inventory = () => {
    const [inventory, setInventory] = useState(initialInventory);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        minStock: ''
    });

    // Filter inventory based on category and search query
    const filteredInventory = inventory.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddItem = () => {
        if (editItem) {
            setInventory(inventory.map(item => 
                item.id === editItem.id ? { ...newItem, id: item.id } : item
            ));
        } else {
            setInventory([...inventory, { ...newItem, id: inventory.length + 1 }]);
        }
        setIsModalOpen(false);
        setNewItem({ name: '', category: '', quantity: '', unit: '', minStock: '' });
        setEditItem(null);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setNewItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setInventory(inventory.filter(item => item.id !== id));
    };

    return (
        <section className='bg-[#1f1f1f] min-h-screen pb-20'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-[#f5f5f5] text-2xl font-bold'>Inventory Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='flex items-center gap-2 bg-[#f6B100] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#e5a400] transition-colors'
                    >
                        <BiPlus size={20} />
                        Add Item
                    </button>
                </div>

                {/* Search and Filter */}
                <div className='flex items-center gap-4 mb-8'>
                    <div className='flex-1 relative'>
                        <input
                            type='text'
                            placeholder='Search inventory...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full bg-[#262626] text-[#f5f5f5] px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#f6B100]'
                        />
                        <BiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ababab]' size={20} />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='bg-[#262626] text-[#f5f5f5] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f6B100]'
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Inventory Table */}
                <div className='bg-[#262626] rounded-lg overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-[#1a1a1a]'>
                                <th className='text-[#f5f5f5] px-6 py-3 text-left'>Name</th>
                                <th className='text-[#f5f5f5] px-6 py-3 text-left'>Category</th>
                                <th className='text-[#f5f5f5] px-6 py-3 text-left'>Quantity</th>
                                <th className='text-[#f5f5f5] px-6 py-3 text-left'>Min Stock</th>
                                <th className='text-[#f5f5f5] px-6 py-3 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.id} className='border-t border-[#333]'>
                                    <td className='text-[#f5f5f5] px-6 py-4'>{item.name}</td>
                                    <td className='text-[#f5f5f5] px-6 py-4'>{item.category}</td>
                                    <td className='text-[#f5f5f5] px-6 py-4'>
                                        {item.quantity} {item.unit}
                                        {item.quantity <= item.minStock && (
                                            <span className='ml-2 text-red-500'>(Low Stock)</span>
                                        )}
                                    </td>
                                    <td className='text-[#f5f5f5] px-6 py-4'>{item.minStock} {item.unit}</td>
                                    <td className='text-[#f5f5f5] px-6 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className='text-blue-500 hover:text-blue-600'
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className='text-red-500 hover:text-red-600'
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Item Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditItem(null);
                    setNewItem({ name: '', category: '', quantity: '', unit: '', minStock: '' });
                }}
                title={editItem ? 'Edit Item' : 'Add New Item'}
            >
                <div className='space-y-4'>
                    <div>
                        <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                            Item Name
                        </label>
                        <input
                            type='text'
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className='w-full bg-[#1f1f1f] text-[#f5f5f5] px-4 py-2 rounded-lg border border-[#333] focus:outline-none focus:border-[#f6B100]'
                            placeholder='Enter item name'
                        />
                    </div>
                    <div>
                        <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                            Category
                        </label>
                        <select
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                            className='w-full bg-[#1f1f1f] text-[#f5f5f5] px-4 py-2 rounded-lg border border-[#333] focus:outline-none focus:border-[#f6B100]'
                        >
                            <option value=''>Select category</option>
                            {categories.filter(cat => cat !== 'All').map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                                Quantity
                            </label>
                            <input
                                type='number'
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                className='w-full bg-[#1f1f1f] text-[#f5f5f5] px-4 py-2 rounded-lg border border-[#333] focus:outline-none focus:border-[#f6B100]'
                                placeholder='Enter quantity'
                            />
                        </div>
                        <div>
                            <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                                Unit
                            </label>
                            <input
                                type='text'
                                value={newItem.unit}
                                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                className='w-full bg-[#1f1f1f] text-[#f5f5f5] px-4 py-2 rounded-lg border border-[#333] focus:outline-none focus:border-[#f6B100]'
                                placeholder='e.g., kg, L, pcs'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-[#ababab] mb-2 text-sm font-medium'>
                            Minimum Stock Level
                        </label>
                        <input
                            type='number'
                            value={newItem.minStock}
                            onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                            className='w-full bg-[#1f1f1f] text-[#f5f5f5] px-4 py-2 rounded-lg border border-[#333] focus:outline-none focus:border-[#f6B100]'
                            placeholder='Enter minimum stock level'
                        />
                    </div>
                    <button
                        onClick={handleAddItem}
                        className='w-full bg-[#f6B100] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#e5a400] transition-colors mt-4'
                    >
                        {editItem ? 'Update Item' : 'Add Item'}
                    </button>
                </div>
            </Modal>

            <Bottom />
        </section>
    );
};

export default Inventory;